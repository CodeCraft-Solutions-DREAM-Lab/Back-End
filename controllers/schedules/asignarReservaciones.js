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

        console.log('Pending reservations:', reservations);

        // Step 2: Parse the date and time
        reservations.forEach(reservation => {
            if (typeof reservation.fecha !== 'string') {
                reservation.fecha = reservation.fecha.toISOString().split('T')[0]; // Convert to ISO string and keep only the date part
            }
            if (typeof reservation.horaInicio !== 'string') {
                reservation.horaInicio = reservation.horaInicio.toISOString().split('T')[1].slice(0, 8); // Convert to ISO string and keep only the time part
            }
        });

        console.log('Parsed reservations:', reservations);

        // Step 3: Sort reservations by priority points, then by date, then by start time, then by idReservacion
        reservations.sort((a, b) => {
            if (a.prioridad > b.prioridad) return -1; // Sort by priority points descending
            if (a.prioridad < b.prioridad) return 1;
            if (a.fecha < b.fecha) return -1; // Sort by date ascending
            if (a.fecha > b.fecha) return 1;
            if (a.horaInicio < b.horaInicio) return -1; // Sort by start time ascending
            if (a.horaInicio > b.horaInicio) return 1;
            if (a.idReservacion < b.idReservacion) return -1; // Sort by reservation id ascending (earlier requests first)
            if (a.idReservacion > b.idReservacion) return 1;
            return 0;
        });

        console.log('Sorted reservations:', reservations);

        // Step 4: Check for conflicts and assign reservations
        let confirmedReservations = [];
        let deniedReservations = [];
        let activeReservations = {};

        for (let reservation of reservations) {
            const { idReservacion, prioridad, fecha, horaInicio, duracion, idSala } = reservation;
            let conflictingReservation = false;

            if (!activeReservations[fecha]) {
                activeReservations[fecha] = [];
            }

            const [currentHours, currentMinutes] = horaInicio.split(':').map(Number);
            const currentEndHours = currentHours + duracion;
            const currentEndTime = `${currentEndHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

            for (let active of activeReservations[fecha]) {
                if (active.idSala !== idSala) {
                    continue; // Skip reservations in different labs/rooms
                }

                const [activeHours, activeMinutes] = active.horaInicio.split(':').map(Number);
                const activeEndHours = activeHours + active.duracion;
                const activeEndTime = `${activeEndHours.toString().padStart(2, '0')}:${activeMinutes.toString().padStart(2, '0')}`;

                console.log(`Comparing current reservation ${idReservacion} (start: ${horaInicio}, end: ${currentEndTime}) with active reservation ${active.idReservacion} (start: ${active.horaInicio}, end: ${activeEndTime})`);

                // Check for time conflicts
                if (
                    (horaInicio < activeEndTime && currentEndTime > active.horaInicio) ||
                    (horaInicio === active.horaInicio)
                ) {
                    // If there's a conflict based on time and duration, check priority
                    console.log(`Conflict detected. Current reservation priority: ${prioridad}, Active reservation priority: ${active.prioridad}`);
                    if (prioridad > active.prioridad) {
                        // If current reservation has higher priority, deny the active one
                        console.log(`Current reservation ${idReservacion} has higher priority. Denying active reservation ${active.idReservacion}.`);
                        deniedReservations.push(active.idReservacion);
                        activeReservations[fecha] = activeReservations[fecha].filter(r => r.idReservacion !== active.idReservacion);
                    } else {
                        // If active reservation has higher or equal priority, deny this one
                        console.log(`Active reservation ${active.idReservacion} has higher or equal priority. Denying current reservation ${idReservacion}.`);
                        conflictingReservation = true;
                        deniedReservations.push(idReservacion);
                        break;
                    }
                }
            }

            if (!conflictingReservation) {
                confirmedReservations.push(idReservacion);
                activeReservations[fecha].push(reservation);
            }
        }

        // Step 5: Assign tables to confirmed reservations
        for (let reservation of confirmedReservations) {
            let { idReservacion, idSala, numPersonas } = reservations.find(r => r.idReservacion === reservation);
            const availableTables = await db.executeProcedure("getMesasFromSalaByCupo", { idSala, cupos: numPersonas });

            if (availableTables.length > 0) {
                // Sort tables by the number of seats (cupos) in ascending order to find the smallest suitable table
                availableTables.sort((a, b) => a.cupos - b.cupos);
                const idMesa = availableTables[0].idMesa;
                const updateTableQuery = `UPDATE Reservaciones SET idMesa = ${idMesa} WHERE idReservacion = ${idReservacion}`;
                console.log('Update Table Query:', updateTableQuery);
                await db.executeQuery(updateTableQuery);
                console.log(`Table ${idMesa} assigned to reservation ${idReservacion}.`);
            } else {
                console.log(`No available table found for reservation ${idReservacion}.`);
                deniedReservations.push(idReservacion);
                confirmedReservations = confirmedReservations.filter(r => r !== idReservacion);
            }
        }

        // Step 6: Update statuses in the database
        if (confirmedReservations.length > 0) {
            const confirmedQuery = `UPDATE Reservaciones SET estatus = 3 WHERE idReservacion IN (${confirmedReservations.join(', ')})`;
            console.log('Confirmed Query:', confirmedQuery);
            await db.executeQuery(confirmedQuery);
            console.log('Confirmed reservations updated successfully.');
        }

        if (deniedReservations.length > 0) {
            const deniedQuery = `UPDATE Reservaciones SET estatus = 6 WHERE idReservacion IN (${deniedReservations.join(', ')})`;
            console.log('Denied Query:', deniedQuery);
            await db.executeQuery(deniedQuery);
            console.log('Denied reservations updated successfully.');
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
