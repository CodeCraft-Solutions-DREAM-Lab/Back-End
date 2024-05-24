import express from "express";
import usuarios from "../controllers/usuarios.js";
import reservaciones from "../controllers/reservaciones.js";
import salas from "../controllers/salas.js";
import chatbotBridge from "../controllers/chatbotBridge.js";
import auth from "../controllers/auth.js";
import experiencias from "../controllers/experiencias.js";
import mesas from "../controllers/mesas.js";
import videowall from "../controllers/videowall.js";
import materiales from "../controllers/materiales.js";
import perfil from "../controllers/perfil.js";
import logros from "../controllers/logros.js";

import scheduler from "../scheduledTaks/scheduler.js";

const router = express.Router();

router.use("/usuarios", usuarios);
router.use("/auth", auth);
router.use("/reservaciones", reservaciones);
router.use("/salas", salas);
router.use("/chatbot", chatbotBridge);
router.use("/experiencias", experiencias);
router.use("/mesas", mesas);
router.use("/videowall", videowall);
router.use("/materiales", materiales);
router.use("/perfil", perfil);
router.use("/logros", logros);

for (const key in scheduler) {
	scheduler[key]();
}

import sendReminder1dayBefore from "../controllers/schedules/sendReminder1dayBefore.js";

router.get("/testReminder", async (req, res) => {
	await sendReminder1dayBefore();

	res.status(200).json({ message: "Test reminder" });
});

export { router };
