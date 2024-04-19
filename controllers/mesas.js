import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /mesas:
 *  get:
 *    summary: Obtiene todas las mesas
 *    tags:
 *     - Mesas
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
 *                  idMesa:
 *                    type: integer
 *                  idSala:
 *                    type: integer
 *                  cupos:
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
        const usuarios = await database.readAll("Mesas");
        console.log(`Mesas: ${JSON.stringify(usuarios)}`);
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /mesas/{idSala}:
 *  get:
 *    summary: Obtiene las mesas de una sala específica
 *    tags:
 *     - Mesas
 *    parameters:
 *      - in: path
 *        name: idSala
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la sala
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                maxCupos:
 *                  type: integer
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
router.get("/:idSala", async (req, res) => {
    try {
        const salaId = req.params.idSala;

        const result = await database.executeQuery(
            `EXEC [dbo].[getMaxCuposBySalaId] @idSala = ${salaId};`
        );
        console.log(`experiencia: ${JSON.stringify(result)}`);
        res.status(200).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
