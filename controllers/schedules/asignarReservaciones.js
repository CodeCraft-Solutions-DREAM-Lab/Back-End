import Database from "../../database.js";
import { config } from "../../config.js";

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

        //console.log('Pending reservations:', reservations);

        // Step 2: Obtain all future confirmed reservations
        const futureConfirmedReservations = await db.executeQuery(
            "SELECT idReservacion, idSala, idMesa, fecha, horaInicio, duracion FROM Reservaciones WHERE fecha > GETDATE() AND estatus = 3;"
        );

        let futureReservations = futureConfirmedReservations.recordset;
        //console.log("Future reservations", futureReservations);

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

        //console.log('Parsed reservations:', reservations);

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

        //console.log('Sorted reservations:', reservations);

        // Step 5: Prepare storage for confirmed and denied reservations
        let confirmedReservations = [];
        let deniedReservations = [];
        let activeReservations = {};

        // Function to check table availability and assign a table
        const assignTable = async (reservation) => {
            const { idReservacion, idSala, fecha, horaInicio, numPersonas } = reservation;

            //console.log(`Checking table availability for reservation ${idReservacion} in room ${idSala} for ${numPersonas} people.`);

            const availableTables = await db.executeProcedure("getMesasFromSalaByCupo", { idSala, cupos: numPersonas });
            //console.log(`Available tables for reservation ${idReservacion}:`, availableTables);

            let occupiedTables = futureReservations
                .filter(future => future.fecha === fecha && future.idSala === idSala && future.horaInicio === horaInicio)
                .map(future => future.idMesa);

            //console.log(`Occupied tables for reservation ${idReservacion}:`, occupiedTables);

            // Sort tables by the number of seats (cupos) in ascending order to find the smallest suitable table
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
                //console.log(`No available table found for reservation ${idReservacion}. Denying reservation.`);
                deniedReservations.push(idReservacion);
                continue;
            }

            reservation.idMesa = assignedTable; // Assign table to the reservation
            activeReservations[fecha].push(reservation);
            //console.log(`Table ${assignedTable} assigned to reservation ${idReservacion}.`);
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
                    continue; // Skip reservations on different tables or itself
                }

                const [activeHours, activeMinutes] = active.horaInicio.split(':').map(Number);
                const activeEndHours = activeHours + active.duracion;
                const activeEndTime = `${activeEndHours.toString().padStart(2, '0')}:${activeMinutes.toString().padStart(2, '0')}`;

                //console.log(`Comparing current reservation ${idReservacion} (start: ${horaInicio}, end: ${currentEndTime}) with active reservation ${active.idReservacion} (start: ${active.horaInicio}, end: ${activeEndTime})`);

                // Check for time conflicts on the same table
                if (horaInicio < activeEndTime && currentEndTime > active.horaInicio) {
                    //console.log(`Conflict detected. Current reservation priority: ${prioridad}, Active reservation priority: ${active.prioridad}`);
                    if (prioridad > active.prioridad || (prioridad === active.prioridad && idReservacion < active.idReservacion)) {
                        //console.log(`Current reservation ${idReservacion} has higher priority or was created earlier. Denying active reservation ${active.idReservacion}.`);
                        deniedReservations.push(active.idReservacion);
                        activeReservations[fecha] = activeReservations[fecha].filter(r => r.idReservacion !== active.idReservacion);
                    } else {
                        //console.log(`Active reservation ${active.idReservacion} has higher or equal priority. Denying current reservation ${idReservacion}.`);
                        conflictingReservation = true;
                        deniedReservations.push(idReservacion);
                        break;
                    }
                }
            }

            if (!conflictingReservation) {
                confirmedReservations.push(idReservacion);
            }
        }

        //console.log("Confirmed Reservations:", confirmedReservations);

        // Step 8: Update statuses in the database
        if (confirmedReservations.length > 0) {
            const confirmedQuery = `UPDATE Reservaciones SET estatus = 3, idMesa = CASE idReservacion ${confirmedReservations.map(reservation => `WHEN ${reservation} THEN ${reservations.find(r => r.idReservacion === reservation).idMesa}`).join(' ')} END WHERE idReservacion IN (${confirmedReservations.join(', ')})`;
            //console.log('Confirmed Query:', confirmedQuery);
            await db.executeQuery(confirmedQuery);
            //console.log('Confirmed reservations updated successfully.');
        }

        if (deniedReservations.length > 0) {
            const deniedQuery = `UPDATE Reservaciones SET estatus = 6 WHERE idReservacion IN (${deniedReservations.join(', ')})`;
            //console.log('Denied Query:', deniedQuery);
            await db.executeQuery(deniedQuery);
            //console.log('Denied reservations updated successfully.');
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
