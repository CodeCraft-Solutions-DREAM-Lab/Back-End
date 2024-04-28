import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /materiales-disponibles:
 *  get:
 *    summary: Obtiene los materiales disponibles dado una sala, fecha, hora de inicio, y duración
 *    tags:
 *     - Materiales
 *    parameters:
 *      - in: query
 *        name: idSala
 *        required: true
 *        description: ID de la sala
 *        schema:
 *          type: integer
 *      - in: query
 *        name: fecha
 *        required: true
 *        description: Fecha de la reservación (YYYY-MM-DD)
 *        schema:
 *          type: string
 *          format: date
 *      - in: query
 *        name: horaInicio
 *        required: true
 *        description: Hora de inicio de la reservación (HH:MM:SS)
 *        schema:
 *          type: string
 *          format: time
 *      - in: query
 *        name: duracion
 *        required: true
 *        description: Duración de la reservación en horas
 *        schema:
 *          type: integer
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
 *                  nombreMaterial:
 *                    type: string
 *                  cantidadDisponible:
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
router.post("/", async (req, res) => {
    let { idSala, fecha, horaInicio, duracion } = req.body;
    try {
        const result = await database.executeProcedure(
            "getMaterialesDisponibles",
            { 
                idSala: parseInt(idSala),
                fecha: fecha,
                horaInicio: horaInicio,
                duracion: parseInt(duracion)
            }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
