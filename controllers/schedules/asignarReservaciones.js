import Database from "../../database.js";
import { config } from "../../config.js";
import sendConfirmationEmail from "./sendConfirmationEmail.js";
import sendRejectionEmail from "./sendRejectionEmail.js";

// Initialize the Database instance
const db = new Database(config);

const asignarReservaciones = async () => {
    try {
        // Connect to the database
        await db.connect();
        console.log('Connected to the database.');

        // Step 1: Retrieve all pending reservations
        const pendingReservations = await db.executeProcedure(
            "getReservacionesByStatus", { estatus: 5 }
        );

        let reservations = pendingReservations;

        if (reservations.length === 0) {
            console.log('No pending reservations found.');
            return;
        }

        // Step 2: Obtain all future confirmed reservations
        const futureConfirmedReservations = await db.executeQuery(
            "SELECT idReservacion, idSala, idMesa, fecha, horaInicio, duracion FROM Reservaciones WHERE fecha > GETDATE() AND estatus = 3;"
        );

        let futureReservations = futureConfirmedReservations.recordset;

        // Step 3: Parse the date and time for both pending and future reservations
        const parseDateTime = (reservation) => {
            if (typeof reservation.fecha !== 'string') {
                reservation.fecha = reservation.fecha.toISOString().split('T')[0];
            }
            if (typeof reservation.horaInicio !== 'string') {
                reservation.horaInicio = reservation.horaInicio.toISOString().split('T')[1].slice(0, 8);
            }
        };

        reservations.forEach(parseDateTime);
        futureReservations.forEach(parseDateTime);

        // Step 4: Sort reservations by priority points, then by room, then by date, then by start time, then by idReservacion
        reservations.sort((a, b) => {
            if (a.prioridad > b.prioridad) return -1;
            if (a.prioridad < b.prioridad) return 1;
            if (a.idSala < b.idSala) return -1;
            if (a.idSala > b.idSala) return 1;
            if (a.fecha < b.fecha) return -1;
            if (a.fecha > b.fecha) return 1;
            if (a.horaInicio < b.horaInicio) return -1;
            if (a.horaInicio > b.horaInicio) return 1;
            if (a.idReservacion < b.idReservacion) return -1;
            if (a.idReservacion > b.idReservacion) return 1;
            return 0;
        });

        // Step 5: Prepare storage for confirmed and denied reservations
        let confirmedReservations = [];
        let deniedReservations = new Set();  // Use Set to avoid duplicates
        let activeReservations = {};

        // Function to check table availability and assign a table
        const assignTable = async (reservation) => {
            const { idReservacion, idSala, fecha, horaInicio, numPersonas } = reservation;

            const availableTables = await db.executeProcedure("getMesasFromSalaByCupo", { idSala, cupos: numPersonas });

            let occupiedTables = futureReservations
                .filter(future => future.fecha === fecha && future.idSala === idSala && future.horaInicio === horaInicio)
                .map(future => future.idMesa);

            availableTables.sort((a, b) => a.cupos - b.cupos);

            for (let table of availableTables) {
                if (!occupiedTables.includes(table.idMesa)) {
                    return table.idMesa;
                }
            }

            return null;
        };

        // Step 6: Assign tables to reservations
        for (let reservation of reservations) {
            const { idReservacion, fecha, horaInicio, idSala } = reservation;

            if (!activeReservations[fecha]) {
                activeReservations[fecha] = [];
            }

            const assignedTable = await assignTable(reservation);

            if (!assignedTable) {
                deniedReservations.add(idReservacion);  // Add to Set
                continue;
            }

            reservation.idMesa = assignedTable;
            activeReservations[fecha].push(reservation);
        }

        // Step 7: Check for conflicts among assigned reservations
        for (let reservation of reservations) {
            const { idReservacion, fecha, idMesa, horaInicio, duracion, prioridad } = reservation;

            const [currentHours, currentMinutes] = horaInicio.split(':').map(Number);
            const currentEndHours = currentHours + duracion;
            const currentEndTime = `${currentEndHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

            let conflictingReservation = false;

            for (let active of activeReservations[fecha]) {
                if (active.idMesa !== idMesa || active.idReservacion === idReservacion) {
                    continue;
                }

                const [activeHours, activeMinutes] = active.horaInicio.split(':').map(Number);
                const activeEndHours = activeHours + active.duracion;
                const activeEndTime = `${activeEndHours.toString().padStart(2, '0')}:${activeMinutes.toString().padStart(2, '0')}`;

                if (horaInicio < activeEndTime && currentEndTime > active.horaInicio) {
                    if (prioridad > active.prioridad || (prioridad === active.prioridad && idReservacion < active.idReservacion)) {
                        deniedReservations.add(active.idReservacion);
                        activeReservations[fecha] = activeReservations[fecha].filter(r => r.idReservacion !== active.idReservacion);
                    } else {
                        conflictingReservation = true;
                        deniedReservations.add(idReservacion);
                        break;
                    }
                }
            }

            if (!conflictingReservation) {
                confirmedReservations.push(idReservacion);
            }
        }

        // Step 8: Update statuses in the database
        if (confirmedReservations.length > 0) {
            const confirmedQuery = `UPDATE Reservaciones SET estatus = 3, idMesa = CASE idReservacion ${confirmedReservations.map(reservation => `WHEN ${reservation} THEN ${reservations.find(r => r.idReservacion === reservation).idMesa}`).join(' ')} END WHERE idReservacion IN (${confirmedReservations.join(', ')})`;
            await db.executeQuery(confirmedQuery);

            // Send confirmation email
            console.log("Sending confirmation emails...");
            for (const reservationId of confirmedReservations) {
                await sendConfirmationEmail(reservationId);
            }
        }

        if (deniedReservations.size > 0) {
            const deniedQuery = `UPDATE Reservaciones SET estatus = 6 WHERE idReservacion IN (${Array.from(deniedReservations).join(', ')})`;
            await db.executeQuery(deniedQuery);

            // Send rejection email
            console.log("Sending rejection emails...");
            for (const reservationId of deniedReservations) {
                await sendRejectionEmail(reservationId);
            }
        }

        console.log('Reservation organization completed successfully.');

    } catch (err) {
        console.error('Error organizing reservations:', err);
    } finally {
        await db.disconnect();
        console.log('Disconnected from the database.');
    }
};

export default asignarReservaciones;
