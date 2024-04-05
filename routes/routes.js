import express from "express";
import usuarios from "../controllers/usuarios.js";
import reservaciones from "../controllers/reservaciones.js";
import { authUsuario, authToken } from "../controllers/auth.js";

const router = express.Router();

router.use("/usuarios", usuarios);
router.use("/reservaciones", reservaciones);
router.get("/authUsuario", authUsuario);
router.get("/authToken", authToken);

export { router };
