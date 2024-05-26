import express from "express";

const router = express.Router();
router.use(express.json());

export default function (database) {
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
                            reservacionesTotales: { type: 'integer' },
                            reservacionesConfirmadas: { type: 'integer' },
                            reservacionesCanceladas: { type: 'integer' },
                            reservacionesEnEspera: { type: 'integer' },
                            reservacionesDenegadas: { type: 'integer' }
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
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        value: { type: 'integer' }
                                    }
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
            let groupedResponse = {};

            response.forEach((item) => {
                const key = `${item.year}-${item.month}`;

                if (!groupedResponse[key]) {
                    groupedResponse[key] = {
                        year: item.year,
                        month: item.month,
                        salas: [],
                    };
                }

                groupedResponse[key].salas.push({
                    name: item.name,
                    value: item.value,
                });
            });

            // Convert the grouped response object to an array
            response = Object.values(groupedResponse);

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
            const response = await database.executeProcedure(
                "getSalasDisponibles"
            );
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
                            materiales: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        material: { type: 'string' },
                                        uso: { type: 'integer' }
                                    }
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
                "getUsoMaterialByMes"
            );

            // Transform the response
            let groupedResponse = {};

            response.forEach((item) => {
                const key = `${item.year}-${item.month}`;

                if (!groupedResponse[key]) {
                    groupedResponse[key] = {
                        year: item.year,
                        month: item.month,
                        materiales: [],
                    };
                }

                groupedResponse[key].materiales.push({
                    material: item.material,
                    uso: item.uso,
                });
            });

            // Convert the grouped response object to an array
            response = Object.values(groupedResponse);

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

    return router;
}
