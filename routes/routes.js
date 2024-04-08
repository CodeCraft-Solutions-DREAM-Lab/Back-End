import express from "express";
import usuarios from "../controllers/usuarios.js";
import reservaciones from "../controllers/reservaciones.js";
import experiencias from "../controllers/experiencias.js";
import salas from "../controllers/salas.js";
import { authUsuario, authToken } from "../controllers/auth.js";

const router = express.Router();

router.use("/usuarios", usuarios);
router.use("/reservaciones", reservaciones);
router.use("/experiencias", experiencias);
router.use("/salas", salas);
router.post("/authUsuario", authUsuario);
router.post("/authToken", authToken);

export { router };
