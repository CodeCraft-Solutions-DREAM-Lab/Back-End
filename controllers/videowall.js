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
 *                  colorPreferido:
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
    /*
    #swagger.tags = ['Videowall']
    #swagger.description = 'Obtener reservaciones para desplegar en el videowall'
    #swagger.summary = 'Obtener reservaciones para desplegar en el videowall'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idReservacion: { type: 'integer' },
                            nombre_usuario: { type: 'string' },
                            nombre_sala: { type: 'string' },
                            horaInicio: { type: 'string', format: 'date-time' },
                            duracion: { type: 'integer' },
                            fecha: { type: 'string', format: 'date-time' },
                            iconoURL: { type: 'string' },
                            colorPreferido: { type: 'string' },
                            idUsuario: { type: 'string' },
                            tagId: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        const result = await database.executeProcedure(
            "getReservacionesVideowall"
        );

        if (result.nombreAlterno) {
            result.nombre_usuario = result.nombreAlterno;
            delete result.nombreAlterno;
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
