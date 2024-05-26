import express from "express";

const router = express.Router();
router.use(express.json());

export default function (database) {
    router.post("/", async (req, res) => {
        /*
        #swagger.tags = ['Materials']
        #swagger.description = 'Obtiene los materiales disponibles dado una sala, fecha, hora de inicio, y duración'
        #swagger.summary = 'Obtiene los materiales disponibles dado una sala, fecha, hora de inicio, y duración'
        #swagger.requestBody = {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            idSala: { type: 'integer', example: 1 },
                            fecha: { type: 'string', format: 'date', example: '2022-12-31' },
                            horaInicio: { type: 'string', example: '12:00' },
                            duracion: { type: 'integer', example: 2 }
                        }
                    }
                }
            }
        }
        #swagger.responses[200] = {
            description: 'OK',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'integer' },
                                name: { type: 'string' },
                                cantidadDisponible: { type: 'integer' },
                                image: { type: 'string' }
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[500] = {
            description: 'Internal Server Error',
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

    return router;
}
