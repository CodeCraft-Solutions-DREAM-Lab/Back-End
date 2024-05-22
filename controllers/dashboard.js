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

router.get("/reservacionesBySalaByMes", async (req, res) => {
    /*
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Obtiene las reservaciones por sala por mes'
    #swagger.summary = 'Obtiene las reservaciones por sala por mes'
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
                            'Electric Garage': { type: 'integer', nullable: true },
                            'Dimension Forge': { type: 'integer', nullable: true },
                            'New Horizons': { type: 'integer', nullable: true },
                            'Deep Net': { type: 'integer', nullable: true },
                            'Graveyard': { type: 'integer', nullable: true },
                            'PCB Factory': { type: 'integer', nullable: true },
                            'Hack-Battlefield': { type: 'integer', nullable: true },
                            'Testing Land': { type: 'integer', nullable: true },
                            'War Headquarters': { type: 'integer', nullable: true },
                            'Biometrics Flexible Hall': { type: 'integer', nullable: true },
                            'Beyond-Digits': { type: 'integer', nullable: true }
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
            "getReservacionesBySalaByMes"
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/salasDisponibles", async (req, res) => {
    /*
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Obtiene las salas disponibles'
    #swagger.summary = 'Obtiene las salas disponibles'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            sala: {
                                type: 'string',
                                description: 'Nombre de la sala',
                                example: 'Electric Garage'
                            },
                            bloqueada: {
                                type: 'boolean',
                                description: 'Indica si la sala está bloqueada o no',
                                example: false
                            },
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
        const response = await database.executeProcedure("getSalasDisponibles");
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
