import cron from 'node-cron';
import asignarReservaciones from '../controllers/schedules/asignarReservaciones.js';

const scheduleReservationOrganization = () => {
    // Schedule the function to run every three hours: '0 0,3,6,9,12,15,18,21 * * *'
    cron.schedule('*/20 * * * * *', async () => {
        console.log('Running scheduled reservation organization');
        await asignarReservaciones();
    });
};

export default scheduleReservationOrganization;
