import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/", async (_, res) => {
    /*
    #swagger.tags = ['Experiencias']
    #swagger.description = 'Obtiene todas las experiencias'
    #swagger.summary = 'Obtiene todas las experiencias'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idExperiencia: { type: 'integer' },
                            idUF: { type: 'integer', nullable: true },
                            idSala: { type: 'integer' },
                            nombre: { type: 'string' },
                            descripcion: { type: 'string' },
                            esAutoDirigida: { type: 'boolean' },
                            esExclusivaUF: { type: 'boolean' },
                            portadaURL: { type: 'string' },
                            fechaInicio: { type: 'string', format: 'date-time' },
                            fechaFin: { type: 'string', format: 'date-time' },
                            horaFin: { type: 'string', format: 'date-time' }
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
        // Regresa todas las experiencias
        const experiencias = await database.readAll("Experiencias");
        //console.log(`Experiencias: ${JSON.stringify(experiencias)}`);
        res.status(200).json(experiencias);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/autodirigidas", async (_, res) => {
    /*
    #swagger.tags = ['Experiencias']
    #swagger.description = 'Obtiene todas las experiencias autodirigidas'
    #swagger.summary = 'Obtiene todas las experiencias autodirigidas'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idExperiencia: { type: 'integer' },
                            idUF: { type: 'integer', nullable: true },
                            idSala: { type: 'integer' },
                            nombre: { type: 'string' },
                            descripcion: { type: 'string' },
                            esAutoDirigida: { type: 'boolean' },
                            esExclusivaUF: { type: 'boolean' },
                            portadaURL: { type: 'string' },
                            fechaInicio: { type: 'string', format: 'date-time' },
                            fechaFin: { type: 'string', format: 'date-time' },
                            horaFin: { type: 'string', format: 'date-time' }
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
        // Leer todas las experiencias de la base de datos
        const experiencias = await database.readAll("Experiencias");
        console.log(`Experiencias: ${experiencias}`);
        //console.log(`Experiencias: ${JSON.stringify(experiencias)}`);
        // Filtrar las experiencias para obtener solo las autodirigidas
        const experienciasAutodirigidas = experiencias.filter(
            (experiencia) => experiencia.esAutoDirigida == 1
        );
        res.status(200).json(experienciasAutodirigidas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Experiencias']
    #swagger.description = 'Obtiene una experiencia por su ID'
    #swagger.summary = 'Obtiene una experiencia por su ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la experiencia',
        required: true,
        type: 'integer'
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
                            idExperiencia: { type: 'integer' },
                            idUF: { type: 'integer', nullable: true },
                            idSala: { type: 'integer' },
                            nombre: { type: 'string' },
                            descripcion: { type: 'string' },
                            esAutoDirigida: { type: 'boolean' },
                            esExclusivaUF: { type: 'boolean' },
                            portadaURL: { type: 'string' },
                            fechaInicio: { type: 'string', format: 'date-time' },
                            fechaFin: { type: 'string', format: 'date-time' },
                            horaFin: { type: 'string', format: 'date-time' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Not Found'
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
        const experienciaId = req.params.id;
        console.log(`experienciaId: ${experienciaId}`);
        if (experienciaId) {
            const result = await database.executeQuery(
                `EXEC [dbo].[getExperienciaById] @idExperiencia = ${experienciaId};`
            );
            console.log(`experiencia: ${JSON.stringify(result)}`);
            res.status(200).json(result.recordset);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post("/UFs", async (req, res) => {
    /*
    #swagger.tags = ['Experiencias']
    #swagger.description = 'Obtiene las experiencias de las UFs de un usuario'
    #swagger.summary = 'Obtiene las experiencias de las UFs de un usuario'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        user: { type: 'string' }
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
                            idExperiencia: { type: 'integer' },
                            idUF: { type: 'integer', nullable: true },
                            idSala: { type: 'integer' },
                            nombre: { type: 'string' },
                            descripcion: { type: 'string' },
                            esAutoDirigida: { type: 'boolean' },
                            esExclusivaUF: { type: 'boolean' },
                            portadaURL: { type: 'string' },
                            fechaInicio: { type: 'string', format: 'date-time' },
                            fechaFin: { type: 'string', format: 'date-time' },
                            horaFin: { type: 'string', format: 'date-time' }
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
        // Obtener el usuario enviado como parámetro desde la solicitud
        const userId = req.body.user; // Obtenemos el user
        console.log("userId: " + userId);
        const grupos = await database.readAll("GruposUsuarios");
        const ufsUsuario = grupos.filter((grupo) => grupo.idUsuario == userId);

        console.log(ufsUsuario[0].idUF);
        const expUFs = await database.readAll("Experiencias");
        const expUFsUsuario = expUFs.filter(
            (expUF) => expUF.idUF == ufsUsuario[0].idUF
        );

        console.log("Experiencias UFs usuario: " + expUFsUsuario);

        res.status(200).json(expUFsUsuario);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
