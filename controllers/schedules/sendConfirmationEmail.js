import { config } from "../../config.js";
import Database from "../../database.js";
// import * as mailer from "../nodemailer.js";
import { getHtmlTemplate, sendEmail } from "../../emails/nodemailer.js";
import shortenURL from "../../utils/UrlShortener.js";

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
    const people = reserv.numPersonas;
    const instruccionesURL = reserv.instruccionesURL || ""; // Default to empty string if instruccionesURL is null

    return {
        sala: nameSala,
        fecha: date,
        horaInicio: startHour,
        horaFin: endHour,
        numPersonas: people,
        instruccionesURL: instruccionesURL,
    };
};

const sendConfirmationEmail = async (idReservacion) => {
    const sendConfirmationEmailAux = async (
        emailTemplate,
        templateParams,
        idUsuario
    ) => {
        const emailHtml = getHtmlTemplate(emailTemplate, templateParams);
        console.log("*****************EMAIL HTML");
        console.log(emailHtml);

        sendEmail(
            `${idUsuario.toUpperCase()}@tec.mx`,
            "Confirmación de reservación",
            "",
            emailHtml
        );
    };

    try {
        const reservation = await database.executeProcedure(
            "getReservacionById",
            {
                idReservacion: idReservacion,
            }
        );

        const {
            sala,
            fecha,
            horaInicio,
            horaFin,
            numPersonas,
            instruccionesURL,
        } = await getInfoHtml(reservation[0]);

        let emailTemplate;
        let templateParams;

        if (instruccionesURL) {
            shortenURL(instruccionesURL).then((shortenedURL) => {
                // Send email with instructions
                emailTemplate = "reservReqAcceptedWithInstructions";
                templateParams = {
                    sala,
                    fecha,
                    horaInicio,
                    horaFin,
                    numPersonas,
                    instruccionesURL: shortenedURL,
                };
                sendConfirmationEmailAux(
                    emailTemplate,
                    templateParams,
                    reservation[0].idUsuario
                );
            });
        } else {
            // Send regular confirmation email
            emailTemplate = "reservReqAccepted";
            templateParams = { sala, fecha, horaInicio, horaFin, numPersonas };
            sendConfirmationEmailAux(
                emailTemplate,
                templateParams,
                reservation[0].idUsuario
            );
        }
    } catch (err) {
        console.log(err);
    }
};

export default sendConfirmationEmail;
