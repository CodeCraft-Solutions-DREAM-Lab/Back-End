import express from "express";
import usuarios from "../controllers/usuarios.js";
import reservaciones from "../controllers/reservaciones.js";
import salas from "../controllers/salas.js";
import auth from "../controllers/auth.js";
import experiencias from "../controllers/experiencias.js";
import mesas from "../controllers/mesas.js";
import videowall from "../controllers/videowall.js";
import materiales from "../controllers/materiales.js";
import perfil from "../controllers/perfil.js";
import logros from "../controllers/logros.js";
import dashboard from "../controllers/dashboard.js";
import correrAsignacion from "../controllers/correrAsignacion.js";
import sendReminder2hrsBefore from "../controllers/schedules/sendReminder2hrsBefore.js";
import estatus from "../controllers/estatus.js";
import ufs from "../controllers/ufs.js";

import { getHtmlTemplate, sendEmail } from "../emails/nodemailer.js";

const router = express.Router();

router.use("/usuarios", usuarios);
router.use("/auth", auth);
router.use("/reservaciones", reservaciones);
router.use("/salas", salas);
router.use("/experiencias", experiencias);
router.use("/mesas", mesas);
router.use("/videowall", videowall);
router.use("/materiales", materiales);
router.use("/perfil", perfil);
router.use("/logros", logros);
router.use("/dashboard", dashboard);
router.use("/correr-asignacion", correrAsignacion);
router.use("/estatus", estatus);
router.use("/ufs", ufs);



router.get("/test", async () => {
    await sendReminder2hrsBefore();
});

router.get("/test-email", async (
    req,
    res
) => {

    const emailHtml = getHtmlTemplate(
        "reservReqDenied",
        {
            nombre_usuario: "Efraín",
            logro: "Epic Dreamer",
            sala: "",
            fecha: "15 de Enero",
            horaInicio: "10:00",
            horaFin: "12:00",
        }
    );

    await sendEmail(
        `A01280601@tec.mx`,
        "Haz obtenido un nuevo logro",
        "",
        emailHtml
    );
});

export { router };
