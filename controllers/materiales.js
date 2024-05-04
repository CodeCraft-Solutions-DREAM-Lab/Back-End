import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /materiales:
 *  post:
 *    summary: Obtiene los materiales disponibles dado una sala, fecha, hora de inicio, y duración
 *    tags:
 *     - Materials
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idSala:
 *                type: integer
 *                example: 1
 *              fecha:
 *                type: string
 *                format: date
 *                example: "2022-12-31"
 *              horaInicio:
 *                type: string
 *                example: "12:00"
 *              duracion:
 *                type: integer
 *                example: 2
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
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  cantidadDisponible:
 *                    type: integer
 *                  image:
 *                    type: string
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.post("/", async (req, res) => {
    let { idSala, fecha, horaInicio, duracion } = req.body;
    try {
        const result = await database.executeProcedure(
            "getMaterialesDisponibles",
            {
                idSala: parseInt(idSala),
                fecha: fecha,
                horaInicio: horaInicio,
                duracion: parseInt(duracion),
            }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
