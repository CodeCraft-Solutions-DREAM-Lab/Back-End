import express from "express";
import usuarios from "../controllers/usuarios.js";
import reservaciones from "../controllers/reservaciones.js";
import experiencias from "../controllers/experiencias.js";

const router = express.Router();

router.use("/usuarios", usuarios);
router.use("/reservaciones", reservaciones);
router.use("/experiencias", experiencias);

export { router };
