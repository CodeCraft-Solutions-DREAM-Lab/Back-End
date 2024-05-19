import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /usuarios:
 *  get:
 *    summary: Obtiene todos los usuarios
 *    tags:
 *     - Usuarios
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  idUsuario:
 *                    type: string
 *                  nombre:
 *                    type: string
 *                  apellidoP:
 *                    type: string
 *                  apellidoM:
 *                    type: string
 *                  tipo:
 *                    type: string
 *                  prioridad:
 *                    type: integer
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.get("/", async (_, res) => {
	try {
		// Return a list of usuarios
		const usuarios = await database.readAll("Usuarios");
		console.log(`Usuarios: ${JSON.stringify(usuarios)}`);
		res.status(200).json(usuarios);
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
});

/**
 * @openapi
 * /usuarios/{idUsuario}:
 *  put:
 *    summary: Obtiene un usuario por id
 *    tags:
 *     - Usuarios
 *    parameters:
 *      - in: path
 *        name: idUsuario
 *        required: true
 *        description: id del usuario
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                idUsuario:
 *                  type: string
 *                nombre:
 *                  type: string
 *                apellidoP:
 *                  type: string
 *                apellidoM:
 *                  type: string
 *                tipo:
 *                  type: string
 *                prioridad:
 *                  type: integer
 *                logroPrincipal:
 *                  type: integer
 *                colorPreferido:
 *                  type: string
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.put("/:idUsuario", async (req, res) => {
	try {
		const usuarioId = req.params.idUsuario;
		console.log(`usuarioId: ${usuarioId}`);
		const valor = req.body;

		const rowsAffected = await database.update(
			"Usuarios",
			"idUsuario",
			usuarioId,
			valor
		);
		res.status(200).json({ rowsAffected });
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
});

router.post("/cambiarPrioridad", async (req, res) => {
	try {
		const { idUsuario, puntos, motivo } = req.body;

		if (!idUsuario || !puntos || !motivo) {
			res.status(400).json({
				error: "idUsuario, puntos and motivo are required",
			});
			return;
		}

		await database.executeProcedure("addPrioridadToUser", {
			idUsuario,
			prioridad: puntos,
		});

		const currentDate = new Date();
		const sqlDate = currentDate.toISOString().split("T")[0];

		console.log("sqlDate: ", sqlDate);

		await database.executeProcedure("insertIntoHistorialPrioridad", {
			idUsuario,
			fecha: sqlDate,
			motivo,
			prioridad: puntos,
		});

		return res.status(200).json({ message: "Prioridad updated" });
	} catch (err) {
		res.status(500).json({ error: err?.message });
	}
});

export default router;
