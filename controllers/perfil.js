import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/logros/:idUsuario", async (req, res) => {
    /*
    #swagger.tags = ['Perfil']
    #swagger.description = 'Obtener los logros de un usuario'
    #swagger.summary = 'Obtener logros de usuario'
    #swagger.parameters['idUsuario'] = {
        in: 'path',
        description: 'ID del usuario del que se obtendrán los logros',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        logros: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    idLogro: { type: 'integer' },
                                    nombre: { type: 'string' },
                                    iconoURL: { type: 'string' }
                                }
                            }
                        },
                        configuracionLogro: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    idLogro: { type: 'integer' },
                                    nombre: { type: 'string' },
                                    iconoURL: { type: 'string' },
                                    colorPreferido: { type: 'string' }
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
        const logros = await database.executeProcedure("getLogrosByUser", {
            idUsuario: req.params.idUsuario,
        });
        const configuracionLogro = await database.executeProcedure(
            "getConfiguracionLogro",
            {
                idUsuario: req.params.idUsuario,
            }
        );

        res.status(200).json({
            logros: logros,
            configuracionLogro: configuracionLogro,
        });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post("/logros/:idUsuario", async (req, res) => {
    /*
    #swagger.tags = ['Perfil']
    #swagger.description = 'Configura el logro y color preferido del usuario'
    #swagger.summary = 'Configura el logro y color preferido del usuario'
    #swagger.parameters['idUsuario'] = {
        in: 'path',
        description: 'ID del usuario al que se le configurará el logro y color preferido',
        required: true,
        type: 'string'
    }
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        idLogro: { type: 'integer' },
                        colorPreferido: { type: 'string', nullable: true }
                    }
                }
            }
        }
    }
    #swagger.responses[204] = {
        description: 'No Content'
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
        const { idLogro, colorPreferido } = req.body;
        await database.executeProcedure("setConfiguracionLogroUsuario", {
            idUsuario: req.params.idUsuario,
            idLogro: idLogro,
            colorPreferido: colorPreferido,
        });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/:idUsuario", async (req, res) => {
    /*
    #swagger.tags = ['Perfil']
    #swagger.description = 'Obtiene todas las salas'
    #swagger.summary = 'Obtiene todas las salas'
    #swagger.parameters['idUsuario'] = {
        in: 'path',
        description: 'ID del usuario',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        recordsets: {
                            type: 'array',
                            items: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        prioridad: { type: 'integer' },
                                        nombre: { type: 'string' },
                                        apellidoP: { type: 'string' },
                                        apellidoM: { type: 'string' },
                                        apodo: { type: 'string' },
                                        iconoURL: { type: 'string' }
                                    }
                                }
                            }
                        },
                        recordset: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    idSala: { type: 'integer' },
                                    idReservacion: { type: 'integer' },
                                    idExperiencia: { type: 'integer' },
                                    idMesa: { type: 'integer' },
                                    estatus: { type: 'integer' },
                                    horaInicio: { type: 'string' },
                                    duracion: { type: 'integer' },
                                    fecha: { type: 'string' },
                                    numPersonas: { type: 'integer' },
                                    nombre_experiencia: { type: 'string' },
                                    nombre_sala: { type: 'string' }
                                }
                            }
                        },
                        output: { type: 'object' },
                        rowsAffected: {
                            type: 'array',
                            items: { type: 'string' }
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
        const usuarioId = req.params.idUsuario;

        const result = await database.executeQuery(
            `EXEC [dbo].[getPerfilUsuario] @idUsuario = ${usuarioId};`
        );

        res.status(200).json(result);
        console.log(`Perfil: ${JSON.stringify(result)}`);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
