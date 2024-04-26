import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /videowall/reservaciones:
 *  get:
 *    summary: Get reservations by status
 *    tags:
 *     - Videowall
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
 *                  idReservacion:
 *                    type: integer
 *                  nombre_usuario:
 *                    type: string
 *                  nombre_sala:
 *                    type: string
 *                  horaInicio:
 *                    type: string
 *                    format: date-time
 *                  duracion:
 *                    type: integer
 *                  fecha:
 *                    type: string
 *                    format: date-time
 *                  iconoURL:
 *                    type: string
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
router.get("/reservaciones", async (req, res) => {
    try {
        const result = await database.executeProcedure(
            "getReservacionesByStatus",
            { estatus: 3 }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
