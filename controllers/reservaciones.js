import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /reservaciones:
 *  get:
 *    summary: Obtiene todas las reservaciones
 *    tags:
 *     - Reservaciones
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
 *                  idUsuario:
 *                    type: string
 *                  idSala:
 *                    type: integer
 *                  idExperiencia:
 *                    type: integer
 *                  idMesa:
 *                    type: integer
 *                  horaInicio:
 *                    type: string
 *                    format: date-time
 *                  duracion:
 *                    type: integer
 *                  fecha:
 *                    type: string
 *                    format: date-time
 *                  numPersonas:
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
        // Return a list of reservaciones
        const reservaciones = await database.readAll("Reservaciones");
        console.log(`Usuarios: ${JSON.stringify(reservaciones)}`);
        res.status(200).json(reservaciones);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /reservaciones/usuario/{id}:
 *  get:
 *    summary: Obtiene las reservaciones de un usuario
 *    tags:
 *     - Reservaciones
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID del usuario
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
 *                  idUsuario:
 *                    type: string
 *                  idSala:
 *                    type: integer
 *                  idExperiencia:
 *                    type: integer
 *                  idMesa:
 *                    type: integer
 *                  horaInicio:
 *                    type: string
 *                    format: date-time
 *                  duracion:
 *                    type: integer
 *                  fecha:
 *                    type: string
 *                    format: date-time
 *                  numPersonas:
 *                    type: integer
 *      404:
 *        description: Not Found
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
router.get("/usuario/:id", async (req, res) => {
    try {
        const usuarioId = req.params.id;
        console.log(`usuarioId: ${usuarioId}`);
        if (usuarioId) {
            const result = await database.executeQuery(
                `EXEC [dbo].[getReservacionByUser] @idUsuario = ${usuarioId};`
            );
            console.log(`reserv: ${JSON.stringify(result)}`);
            res.status(200).json(result.recordset);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /reservaciones:
 *  post:
 *    summary: Crea una nueva reservación
 *    tags:
 *     - Reservaciones
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idUsuario:
 *                type: string
 *              idSala:
 *                type: integer
 *              idExperiencia:
 *                type: integer
 *              idMesa:
 *                type: integer
 *              horaInicio:
 *                type: string
 *                format: date-time
 *              duracion:
 *                type: integer
 *              fecha:
 *                type: string
 *                format: date-time
 *              numPersonas:
 *                type: integer
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                rowsAffected:
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
router.post("/", async (req, res) => {
    try {
        const reserv = req.body;
        console.log(`reserv: ${JSON.stringify(reserv)}`);
        const rowsAffected = await database.create("Reservaciones", reserv);
        res.status(201).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /reservaciones/{id}:
 *  get:
 *    summary: Obtiene una reservación por su ID
 *    tags:
 *     - Reservaciones
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la reservación
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                idReservacion:
 *                  type: integer
 *                idUsuario:
 *                  type: string
 *                idSala:
 *                  type: integer
 *                idExperiencia:
 *                  type: integer
 *                idMesa:
 *                  type: integer
 *                horaInicio:
 *                  type: string
 *                  format: date-time
 *                duracion:
 *                  type: integer
 *                fecha:
 *                  type: string
 *                  format: date-time
 *                numPersonas:
 *                  type: integer
 *      404:
 *        description: Not Found
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
router.get("/:id", async (req, res) => {
    try {
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        if (reservId) {
            const result = await database.read(
                "Reservaciones",
                "idReservacion",
                reservId
            );
            console.log(`reserv: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /reservaciones/{id}:
 *  put:
 *    summary: Actualiza una reservación por su ID
 *    tags:
 *     - Reservaciones
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la reservación
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idUsuario:
 *                type: string
 *              idSala:
 *                type: integer
 *              idExperiencia:
 *                type: integer
 *              idMesa:
 *                type: integer
 *              horaInicio:
 *                type: string
 *                format: date-time
 *              duracion:
 *                type: integer
 *              fecha:
 *                type: string
 *                format: date-time
 *              numPersonas:
 *                type: integer
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                rowsAffected:
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
router.put("/:id", async (req, res) => {
    try {
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        const reserv = req.body;

        const rowsAffected = await database.update(
            "Reservaciones",
            "idReservacion",
            reservId,
            reserv
        );
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /reservaciones/{id}:
 *  delete:
 *    summary: Elimina una reservación por su ID
 *    tags:
 *     - Reservaciones
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: ID de la reservación
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                rowsAffected:
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
router.delete("/:id", async (req, res) => {
    try {
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        const rowsAffected = await database.delete(
            "Reservaciones",
            "idReservacion",
            reservId
        );
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
