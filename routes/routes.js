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
import dashboard from "../controllers/dashboard.js";
import correrAsignacion from "../controllers/correrAsignacion.js";

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
router.use("/dashboard", dashboard);
router.use("/correr-asignacion", correrAsignacion);


export { router };
