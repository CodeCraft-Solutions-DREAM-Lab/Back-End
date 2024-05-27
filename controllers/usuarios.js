import express from "express";
// import * as mailer from "../nodemailer.js";
import { getHtmlTemplate, sendEmail } from "../emails/nodemailer.js";

const router = express.Router();
router.use(express.json());

export default function (database) {
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

    router.post("/cambiarPrioridad", async (req, res) => {
        /*
    #swagger.tags = ['Usuarios', 'Prioridad']
    #swagger.description = 'Cambia los puntos de prioridad de un usuario, lo guarda en el historial de cambios y envía un correo al usuario'
    #swagger.summary = 'Cambia los puntos de prioridad de un usuario'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        idUsuario: { type: 'string', example: 'a00833173' },
                        puntos: { type: 'integer', example: 10 },
                        motivo: { type: 'string' }
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
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Prioridad updated' }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Faltan datos',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'idUsuario, puntos and motivo are required' }
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
            const { idUsuario, puntos, motivo } = req.body;

            if (!idUsuario || !puntos || !motivo) {
                res.status(400).json({
                    error: "idUsuario, puntos and motivo are required",
                });
                return;
            }

            await database.executeProcedure("addPrioridadToUser", {
                idUsuario,
                prioridad: puntos,
            });

            const currentDate = new Date();
            const sqlDate = currentDate.toISOString().split("T")[0];

            await database.executeProcedure("insertIntoHistorialPrioridad", {
                idUsuario,
                fecha: sqlDate,
                motivo,
                prioridad: puntos,
            });

            let mensaje = "";

            if (puntos >= 0) {
                mensaje =
                    "Tu prioridad ha aumentado por " + puntos + " puntos.";
            } else {
                mensaje =
                    "Tu prioridad ha disminuido por " + puntos + " puntos.";
            }

            const htmlTemplate = getHtmlTemplate("updatedPriorityPoints", {
                mensaje: mensaje,
                motivo: motivo,
            });

            sendEmail(
                `${idUsuario.toUpperCase()}@tec.mx`,
                "Prioridad actualizada",
                "",
                htmlTemplate
            );

            return res.status(200).json({ message: "Prioridad updated" });
        } catch (err) {
            res.status(500).json({ error: err?.message });
        }
    });

    return router;
}
