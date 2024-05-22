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
                            year: { type: 'integer' },
                            month: { type: 'integer' },
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
                            year: { type: 'integer' },
                            month: { type: 'integer' },
                            salas: {
                                type: 'object',
                                properties: {
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
        let response = await database.executeProcedure(
            "getReservacionesBySalaByMes"
        );

        // Transformamos la respuesta para que sea más fácil de manejar
        response = response.map((item) => {
            const salas = {};

            // Guardamos en 'salas' las salas que no sean 'year' o 'month' y que
            // no sean null
            for (const key in item) {
                if (key !== "year" && key !== "month" && item[key] !== null) {
                    salas[key] = item[key];
                }
            }

            // Devolvemos un objeto con el año, mes y las salas
            return {
                year: item.year,
                month: item.month,
                salas,
            };
        });

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

router.get("/usoMaterialByMes", async (req, res) => {
    /*
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Obtiene el uso de material por mes'
    #swagger.summary = 'Obtiene el uso de material por mes'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            year: { type: 'integer' },
                            month: { type: 'integer' },
                            total: { type: 'integer', nullable: true },
                            'Laptop Gamer': { type: 'integer', nullable: true },
                            'Surface Pro': { type: 'integer', nullable: true },
                            'Chromebook': { type: 'integer', nullable: true },
                            'Oculus Quest 2': { type: 'integer', nullable: true },
                            'HTC Vive Pro 2': { type: 'integer', nullable: true },
                            'PlayStation VR': { type: 'integer', nullable: true },
                            'Visor VR para smartphone': { type: 'integer', nullable: true },
                            'PC de escritorio': { type: 'integer', nullable: true },
                            'Tablet Android': { type: 'integer', nullable: true },
                            'Tablet iPad': { type: 'integer', nullable: true },
                            'Tablet Windows': { type: 'integer', nullable: true },
                            'Cámara Digital (DSLR)': { type: 'integer', nullable: true },
                            'Audífonos Over-Ear': { type: 'integer', nullable: true },
                            'Altavoces Bluetooth': { type: 'integer', nullable: true },
                            'Micrófono': { type: 'integer', nullable: true },
                            'Router Wi-Fi': { type: 'integer', nullable: true },
                            'Cable Ethernet': { type: 'integer', nullable: true },
                            'Tarjeta de Red': { type: 'integer', nullable: true }
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
        const response = await database.executeProcedure("getUsoMaterialByMes");
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/penalizacionesByMes", async (req, res) => {
    /*
    #swagger.tags = ['Dashboard']
    #swagger.description = 'Obtiene las penalizaciones por mes'
    #swagger.summary = 'Obtiene las penalizaciones por mes'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            year: { type: 'integer' },
                            month: { type: 'integer' },
                            penalizaciones: { type: 'integer' }
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
            "getPenalizacionesByMes"
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
