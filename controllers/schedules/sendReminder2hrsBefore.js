import { config } from "../../config.js";
import Database from "../../database.js";
// import * as mailer from "../nodemailer.js";
import { getHtmlTemplate, sendEmail } from "../../emails/nodemailer.js";

// Create database object
const database = new Database(config);

const getSalaName = async (idSala) => {
	const result = await database.executeProcedure("getSalaById", { idSala });
	// console.log("getSalaById: ", result);
	return result[0].nombre;
};

const getDate = (date) => {
	const dateObj = new Date(date);

	const day = dateObj.getUTCDate();
	const month = dateObj.getMonth() + 1;

	const dayStr = day < 10 ? `0${day}` : `${day}`;

	const monthMap = {
		1: "Enero",
		2: "Febrero",
		3: "Marzo",
		4: "Abril",
		5: "Mayo",
		6: "Junio",
		7: "Julio",
		8: "Agosto",
		9: "Septiembre",
		10: "Octubre",
		11: "Noviembre",
		12: "Diciembre",
	};

	const monthStr = monthMap[month];

	return `${dayStr} de ${monthStr}`;
	// return dateObj.toLocaleDateString();
};

const getHour = (date, hours) => {
	const dateObj = new Date(date);
	dateObj.setHours(dateObj.getHours() + hours);

	return dateObj.toISOString().slice(11, 16);
};

const getInfoHtml = async (reserv) => {

	const nameSala = await getSalaName(reserv.idSala);
	const date = getDate(reserv.fecha);
	const startHour = getHour(reserv.horaInicio, 0);
	const endHour = getHour(reserv.horaInicio, reserv.duracion);

	return {
		sala: nameSala,
		fecha: date,
		horaInicio: startHour,
		horaFin: endHour,
	};
};

const sendReminder2hrsBefore = async () => {
	try {
		const today = new Date();
		console.log("Hoy es: ", today);
		today.setHours(today.getHours() - 6); // UTC-6
		console.log("Hoy es: ", today);

		const dateLowerbound = new Date(today);
		dateLowerbound.setHours(dateLowerbound.getHours() + 2);

		const dateUpperbound = new Date(today);
		dateUpperbound.setHours(dateUpperbound.getHours() + 2 + 1); // +1 porque se ejecuta cada hora el cron

		const reservs = await database.executeProcedure(
			"getReservacionesConfirmadasInDateRange",
			{
				fecha: today.toISOString(),
				horaLow: dateLowerbound.toISOString(),
				horaHigh: dateUpperbound.toISOString(),
			}
		);

		console.log(
			"Llamando a las que están entre ",
			dateLowerbound,
			" y ",
			dateUpperbound
		);

		reservs.forEach(async (reserv) => {
			const emailHtml = getHtmlTemplate(
				"reminder2hrsBefore",
				await getInfoHtml(reserv)
			);

            await sendEmail(
                `${reserv.idUsuario.toUpperCase()}@tec.mx`,
                "Recordatorio de reservación",
                "",
                emailHtml
            );
		});
	} catch (err) {
		console.log(err);
	}
};

export default sendReminder2hrsBefore;
