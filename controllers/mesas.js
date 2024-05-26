import express from "express";

const router = express.Router();
router.use(express.json());

export default function (database) {
    router.get("/", async (_, res) => {
        /*
    #swagger.tags = ['Mesas']
    #swagger.description = 'Obtiene todas las mesas'
    #swagger.summary = 'Obtiene todas las mesas'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idMesa: { type: 'integer' },
                            idSala: { type: 'integer' },
                            cupos: { type: 'integer' }
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
            // Return a list of usuarios
            const usuarios = await database.readAll("Mesas");
            res.status(200).json(usuarios);
        } catch (err) {
            res.status(500).json({ error: err?.message });
        }
    });

    router.get("/:idSala", async (req, res) => {
        /*
    #swagger.tags = ['Mesas']
    #swagger.description = 'Obtiene las mesas de una sala específica'
    #swagger.summary = 'Obtiene las mesas de una sala específica'
    #swagger.parameters['idSala'] = {
        in: 'path',
        description: 'ID de la sala',
        required: true,
        type: 'integer'
    }
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        maxCupos: { type: 'integer' }
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
            const salaId = req.params.idSala;

            const result = await database.executeProcedure(
                "getMaxCuposBySalaId",
                {
                    idSala: salaId,
                }
            );
            console.log(`experiencia: ${JSON.stringify(result)}`);
            res.status(200).json(result[0]);
        } catch (err) {
            res.status(500).json({ error: err?.message });
        }
    });

    return router;
}
