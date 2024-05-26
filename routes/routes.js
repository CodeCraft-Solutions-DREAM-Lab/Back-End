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
import asignarReservaciones from "../controllers/schedules/asignarReservaciones.js";

// Create database object
import { config } from "../config.js";
import Database from "../database.js";
const database = new Database(config);

const router = express.Router();

router.use("/usuarios", usuarios(database));
router.use("/auth", auth(database));
router.use("/reservaciones", reservaciones(database));
router.use("/salas", salas);
router.use("/chatbot", chatbotBridge);
router.use("/experiencias", experiencias(database));
router.use("/mesas", mesas(database));
router.use("/videowall", videowall);
router.use("/materiales", materiales);
router.use("/perfil", perfil);
router.use("/logros", logros(database));
router.use("/dashboard", dashboard(database));
// Endpoint para correr manualmente la función para asignar reservaciones
router.get("/correr-asignacion", async (req, res) => {
    try {
        await asignarReservaciones();
        res.status(200).send("Reservations asignadas correctamente.");
    } catch (err) {
        console.error("Error al intentar asignar reservaciones.", err);
        res.status(500).send(
            "Hubo un error al intentar asignar reservaciones."
        );
    }
});

export { router };
