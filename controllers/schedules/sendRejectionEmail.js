import { config } from "../../config.js";
import Database from "../../database.js";
// import * as mailer from "../nodemailer.js";
import { getHtmlTemplate, sendEmail } from "../../emails/nodemailer.js";

// Create database object
const database = new Database(config);

const getDate = (date) => {
	const dateObj = new Date(date);

	const day = dateObj.getDate();
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
	dateObj.setHours(dateObj.getHours() + hours + 6);

	return dateObj.toLocaleTimeString().slice(0, -3);
};

const getInfoHtml = async (reserv) => {

	const nameSala = reserv.nombre_sala;
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

const sendRejectionEmail = async (idReservacion) => {
	try {
		const reservation = await database.executeProcedure(
			"getReservacionById",
			{
				idReservacion: idReservacion
			}
		);

        const emailHtml = getHtmlTemplate(
            "reservReqDenied",
            await getInfoHtml(reservation[0])
        );

        await sendEmail(
            `${reservation[0].idUsuario.toUpperCase()}@tec.mx`,
            "Denegación de reservación",
            "",
            emailHtml
        );

	} catch (err) {
		console.log(err);
	}
};

export default sendRejectionEmail;
