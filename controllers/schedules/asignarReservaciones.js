import Database from "../../database.js";
import { config } from "../../config.js";

// Initialize the Database instance
const db = new Database(config);

const asignarReservaciones = async () => {
    try {
        // Ensure the database connection is established
        await db.ensureConnected();

        // Step 1: Retrieve all pending reservations using the stored procedure
        const pendingReservations = await db.executeProcedure(
            "getReservacionesByStatus",
            { estatus: 5 }
        );

        // Debug: Log the retrieved reservations
        console.log('Pending Reservations:', pendingReservations);

        // Step 2: Sort reservations by priority, then by date, then by start time
        let reservations = pendingReservations;
        reservations.sort((a, b) => {
            // Sort by priority (descending order)
            if (a.prioridad > b.prioridad) return -1;
            if (a.prioridad < b.prioridad) return 1;

            // If priorities are equal, sort by date
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;

            // If dates are equal, sort by start time
            const timeA = typeof a.horaInicio === 'string' ? a.horaInicio.split(":") : [];
            const timeB = typeof b.horaInicio === 'string' ? b.horaInicio.split(":") : [];
            const dateTimeA = new Date(dateA);
            dateTimeA.setHours(timeA[0] || 0, timeA[1] || 0, timeA[2] || 0);
            const dateTimeB = new Date(dateB);
            dateTimeB.setHours(timeB[0] || 0, timeB[1] || 0, timeB[2] || 0);

            if (dateTimeA < dateTimeB) return -1;
            if (dateTimeA > dateTimeB) return 1;

            return 0;
        });

        // Debug: Log the sorted reservations
        console.log('Sorted Reservations:', reservations);

        // Step 3: Check for conflicts and assign reservations
        let confirmedReservations = [];
        let deniedReservations = [];
        let activeReservations = {};

        for (let reservation of reservations) {
            const { idReservacion, fecha, horaInicio, duracion } = reservation;
            let conflictingReservation = false;

            const reservationDate = new Date(fecha);

            if (!activeReservations[fecha]) {
                activeReservations[fecha] = [];
            }

            for (let active of activeReservations[fecha]) {
                const activeStartDate = new Date(active.fecha);
                const activeStartTime = typeof active.horaInicio === 'string' ? active.horaInicio.split(":") : [];
                activeStartDate.setHours(activeStartTime[0] || 0, activeStartTime[1] || 0, activeStartTime[2] || 0);
                const activeEndTime = new Date(activeStartDate);
                activeEndTime.setMinutes(activeEndTime.getMinutes() + active.duracion);

                const currentStartTime = new Date(reservationDate);
                const startTime = typeof horaInicio === 'string' ? horaInicio.split(":") : [];
                currentStartTime.setHours(startTime[0] || 0, startTime[1] || 0, startTime[2] || 0);
                const currentEndTime = new Date(currentStartTime);
                currentEndTime.setMinutes(currentEndTime.getMinutes() + duracion);

                if (currentStartTime < activeEndTime && currentEndTime > activeStartDate) {
                    // Conflict found, deny the current reservation
                    conflictingReservation = true;
                    deniedReservations.push(idReservacion);
                    break;
                }
            }

            if (!conflictingReservation) {
                confirmedReservations.push(idReservacion);
                activeReservations[fecha].push(reservation);
            }
        }

        // Step 4: Update statuses in the database
        if (confirmedReservations.length > 0) {
            await db.executeQuery(`UPDATE Reservaciones SET estatus = 3 WHERE idReservacion IN (${confirmedReservations.join(', ')})`);
        }

        if (deniedReservations.length > 0) {
            await db.executeQuery(`UPDATE Reservaciones SET estatus = 6 WHERE idReservacion IN (${deniedReservations.join(', ')})`);
        }

        console.log('Reservation organization completed successfully.');
    } catch (err) {
        console.error('Error organizing reservations:', err);
    } finally {
        await db.disconnect();
    }
};

export default asignarReservaciones;