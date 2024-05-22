import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/reservacionesByMes", async (req, res) => {
    /*
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Obtiene las reservaciones por mes'
    #swagger.summary = 'Obtiene las reservaciones por mes'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            Year: { type: 'integer' },
                            Month: { type: 'integer' },
                            ReservacionesTotales: { type: 'integer' },
                            ReservacionesConfirmadas: { type: 'integer' },
                            ReservacionesCanceladas: { type: 'integer' },
                            ReservacionesEnEspera: { type: 'integer' },
                            ReservacionesDenegadas: { type: 'integer' }
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
        const response = await database.executeProcedure(
            "getReservacionesByMes"
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
