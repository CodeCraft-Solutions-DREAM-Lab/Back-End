import cron from 'node-cron';
import asignarReservaciones from '../controllers/schedules/asignarReservaciones.js';

const scheduleReservationOrganization = () => {
    // Schedule the function to run every three hours: '0 0,3,6,9,12,15,18,21 * * *'
    // Schedule the function to run every 20 seconds: '/20 * * * * *'
    cron.schedule('0 0,3,6,9,12,15,18,21 * * *', async () => {
        console.log('Running scheduled reservation organization');
        await asignarReservaciones();
    });
};

export default scheduleReservationOrganization;
