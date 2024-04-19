import express from "express";
import { config } from "../config.js";
import Database from "../database.js";
const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /salas:
 *  get:
 *    summary: Obtiene todas las salas
 *    tags:
 *     - Salas
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
 *                  idSala:
 *                    type: integer
 *                  nombre:
 *                    type: string
 *                  cantidadMesas:
 *                    type: integer
 *                  descripcion:
 *                    type: string
 *                  fotoURL:
 *                    type: string
 *                  detallesURL:
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
router.get("/", async (_, res) => {
    try {
        // Regresa todas las salas
        const salas = await database.readAll("Salas");
        res.status(200).json(salas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /salas/horasLibres:
 *  post:
 *    summary: Obtiene las horas libres de una sala
 *    tags:
 *     - Salas
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idSala:
 *                type: integer
 *              fecha:
 *                type: string
 *                format: date
 *              personas:
 *                type: integer
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: integer
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
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
router.post("/horasLibres", async (req, res) => {
    console.log("si llegué a /horasLibres");
    try {
        const { idSala, fecha, personas } = req.body;

        if (!idSala || !fecha) {
            res.status(400).json({ error: "idSala and fecha are required" });
            return;
        }

        if (!personas) personas = 1;

        const resultReservs = await database.executeQuery(
            `EXEC [dbo].[getReservacionesFromSalaByDate] @idSala = ${idSala}, @fecha = '${fecha}';`
        );

        const resultMesas = await database.executeQuery(
            `EXEC [dbo].[getMesasFromSalaByCupo] @idSala = ${idSala}, @cupos = ${personas};`
        );

        const mesasIdsArray = [];
        for (const recordset of resultMesas.recordsets[0]) {
            mesasIdsArray.push(recordset.idMesa);
        }

        const availabilityArray = [];
        for (let i = 0; i <= 24; i++) {
            availabilityArray.push([...mesasIdsArray]);
        }

        resultReservs.recordsets[0].forEach((reserv) => {
            const hora = reserv.horaInicio.getHours() + 6; // UTC-6
            const duracion = reserv.duracion;

            for (let i = 0; i < duracion; i++) {
                const index = availabilityArray[hora + i].indexOf(
                    reserv.idMesa
                );
                console.log(index);
                if (index > -1) {
                    availabilityArray[hora + i].splice(index, 1);
                }
            }
        });

        const freeHoursArray = [];

        for (let i = 9; i <= 18; i++) {
            if (availabilityArray[i].length > 0) {
                freeHoursArray.push(i);
            }
        }

        return res.status(200).json(freeHoursArray);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /salas/{id}:
 *  get:
 *    summary: Obtiene una sala por su ID
 *    tags:
 *     - Salas
 *    parameters:
 *      - in: path
 *        name: id
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
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  idSala:
 *                    type: integer
 *                  nombre:
 *                    type: string
 *                  cantidadMesas:
 *                    type: integer
 *                  descripcion:
 *                    type: string
 *                  fotoURL:
 *                    type: string
 *                  detallesURL:
 *                    type: string
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
        const salaId = req.params.id;
        console.log(`salaId: ${salaId}`);
        if (salaId) {
            const result = await database.executeQuery(
                `EXEC [dbo].[getSalaById] @idSala = ${salaId};`
            );
            console.log(`sala: ${JSON.stringify(result)}`);
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
 * salas/nameFromExperienceId/{id}:
 *  get:
 *    summary: Regresa el nombre de una sala basado en el ID de la experiencia
 *    tags:
 *     - Salas
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          example: 1
 *        required: true
 *        description: ID de la experiencia
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  nombre:
 *                     type: string
 *                     example: Electric Garage
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

router.get("/nameFromExperienceId/:id", async (req, res) => {
    try {
        const experienceId = req.params.id;
        console.log(`experienceId: ${experienceId}`);
        if (experienceId) {
            const result = await database.executeQuery(
                `EXEC [dbo].[getSalaNameFromExperienceId] @idExperiencia = ${experienceId};`
            );

            res.status(200).json({
                nombre: result.recordset[0].nombre,
            });
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
