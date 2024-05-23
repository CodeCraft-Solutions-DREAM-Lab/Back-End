import cron from 'node-cron';
// import asignarReservaciones from '../controllers/schedules/asignarReservaciones.js';

// const scheduleReservationOrganization = () => {
//     // Schedule the function to run every three hours
//     cron.schedule('*/20 * * * * *', async () => { //'0 0,3,6,9,12,15,18,21 * * *'
//         console.log('Running scheduled reservation organization');
//         await asignarReservaciones();
//     });
// };

const scheduleReservationReminders = () => {
    // Schedule the function to run every three hours
    cron.schedule('*/20 * * * * *', async () => { // 0 */1 * * *   (Minute 0 every hour)
        console.log('Revisando a ver si hay recordatorios de reservaciones activas');
    });
};

export default {
    scheduleReservationOrganization,
    scheduleReservationReminders,
};
