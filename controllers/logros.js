import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /logros/{idUsuario}/{idLogro}:
 *  put:
 *    summary: Actualiza un logro específico para un usuario
 *    tags:
 *     - Logros
 *    parameters:
 *      - in: path
 *        name: idUsuario
 *        required: true
 *        description: ID del usuario
 *        schema:
 *          type: string
 *      - in: path
 *        name: idLogro
 *        required: true
 *        description: ID del logro
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                idLogro:
 *                  type: integer
 *                valorActual:
 *                  type: integer
 *                obtenido:
 *                  type: boolean
 *      500:
 *        description: Error
 */
router.put("/:idUsuario/:idLogro", async (req, res) => {
    try {
        const usuarioId = req.params.idUsuario;
        const logroId = req.params.idLogro;

        const valor = req.body;

        const rowsAffected = await database.updateTwo(
            "UsuariosLogros",
            "idUsuario",
            "idLogro",
            usuarioId,
            logroId,
            valor
        );
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
