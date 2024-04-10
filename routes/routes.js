import express from "express";
import usuarios from "../controllers/usuarios.js";
import reservaciones from "../controllers/reservaciones.js";
import experiencias from "../controllers/experiencias.js";
import salas from "../controllers/salas.js";
import chatbotBridge from "../controllers/chatbotBridge.js";
import { authUsuario, authToken } from "../controllers/auth.js";
import { experienciasAutodirigidas } from "../controllers/experiencias.js";
import { experienciasUF } from "../controllers/experiencias.js";

const router = express.Router();

router.use("/usuarios", usuarios);
router.use("/reservaciones", reservaciones);
router.use("/experiencias", experiencias);
router.use("/salas", salas);
router.use("/chatbot", chatbotBridge);
router.post("/authUsuario", authUsuario);
router.post("/authToken", authToken);
router.use("/experiencias/autodirigidas", experienciasAutodirigidas);
router.use("/experiencias/UFs", experienciasUF);

export { router };
