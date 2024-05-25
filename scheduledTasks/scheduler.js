import cron from "node-cron";
import asignarReservaciones from '../controllers/schedules/asignarReservaciones.js';
import sendReminder1dayBefore from "../controllers/schedules/sendReminder1dayBefore.js";
import sendReminder2hrsBefore from "../controllers/schedules/sendReminder2hrsBefore.js";

const scheduleReservationOrganization = () => {
    // Schedule the function to run every three hours
    cron.schedule('0 0,3,6,9,12,15,18,21 * * *', async () => { //'*/20 * * * * *'
        console.log('Running scheduled reservation organization');
        await asignarReservaciones();
    });
};

const scheduleReservationReminders = () => {
	// Schedule the function to run every three hours
	cron.schedule("0 */1 * * *", async () => { // 0 */1 * * *   (Minute 0 every hour)
		console.log("Running scheduled reservation reminders");
        await sendReminder1dayBefore();
        await sendReminder2hrsBefore();
	});
};

export default {
	scheduleReservationOrganization,
	scheduleReservationReminders,
};
