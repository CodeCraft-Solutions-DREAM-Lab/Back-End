import express from "express";

// Controladores
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
import reservacionesMateriales from "../controllers/reservacionesMateriales.js";
import correrAsignacion from "../controllers/correrAsignacion.js";
import estatus from "../controllers/estatus.js";
import ufs from "../controllers/ufs.js";

const router = express.Router();

// Rutas
router.use("/auth", auth);
router.use("/correr-asignacion", correrAsignacion);
router.use("/dashboard", dashboard);
router.use("/estatus", estatus);
router.use("/experiencias", experiencias);
router.use("/logros", logros);
router.use("/materiales", materiales);
router.use("/mesas", mesas);
router.use("/perfil", perfil);
router.use("/reservaciones", reservaciones);
router.use("/reservaciones-materiales", reservacionesMateriales);
router.use("/salas", salas);
router.use("/ufs", ufs);
router.use("/usuarios", usuarios);
router.use("/videowall", videowall);

export { router };
