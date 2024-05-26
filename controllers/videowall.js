import express from "express";

const router = express.Router();
router.use(express.json());

export default function (database) {
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
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: err?.message });
        }
    });

    return router;
}
