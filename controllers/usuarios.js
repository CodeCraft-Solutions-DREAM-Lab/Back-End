import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/", async (_, res) => {
    /*
    #swagger.tags = ['Usuarios']
    #swagger.description = 'Obtiene todos los usuarios'
    #swagger.summary = 'Obtiene todos los usuarios'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idUsuario: { type: 'string' },
                            nombre: { type: 'string' },
                            apellidoP: { type: 'string' },
                            apellidoM: { type: 'string' },
                            tipo: { type: 'string' },
                            prioridad: { type: 'integer' }
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
        const usuarios = await database.readAll("Usuarios");
        console.log(`Usuarios: ${JSON.stringify(usuarios)}`);
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.put("/:idUsuario", async (req, res) => {
    /*
    #swagger.tags = ['Usuarios']
    #swagger.description = 'Obtiene un usuario por id'
    #swagger.summary = 'Obtiene un usuario por id'
    #swagger.parameters['idUsuario'] = {
        in: 'path',
        description: 'id del usuario',
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
                        idUsuario: { type: 'string' },
                        nombre: { type: 'string' },
                        apellidoP: { type: 'string' },
                        apellidoM: { type: 'string' },
                        tipo: { type: 'string' },
                        prioridad: { type: 'integer' },
                        logroPrincipal: { type: 'integer' },
                        colorPreferido: { type: 'string' }
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
        console.log(`usuarioId: ${usuarioId}`);
        const valor = req.body;

        const rowsAffected = await database.update(
            "Usuarios",
            "idUsuario",
            usuarioId,
            valor
        );
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
