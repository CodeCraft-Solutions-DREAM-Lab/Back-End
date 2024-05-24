import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/", async (_, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Obtiene todas las reservaciones'
    #swagger.summary = 'Obtiene todas las reservaciones'
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
                            idUsuario: { type: 'string' },
                            idSala: { type: 'integer' },
                            idExperiencia: { type: 'integer' },
                            idMesa: { type: 'integer' },
                            horaInicio: { type: 'string', format: 'date-time' },
                            duracion: { type: 'integer' },
                            fecha: { type: 'string', format: 'date-time' },
                            numPersonas: { type: 'integer' }
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
        // Return a list of reservaciones
        const reservaciones = await database.readAll("Reservaciones");
        console.log(`Usuarios: ${JSON.stringify(reservaciones)}`);
        res.status(200).json(reservaciones);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/cronograma", async (_, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Obtiene todas las reservaciones confirmadas para el cronograma'
    #swagger.summary = 'Obtiene todas las reservaciones confirmadas para el cronograma'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer', description: 'Identificador único de la reservación' },
                            group: { type: 'integer', description: 'Identificador del grupo o mesa' },
                            title: { type: 'string', description: 'Nombre completo del usuario que hizo la reservación' },
                            start_time: { type: 'string', format: 'date-time', description: 'Fecha y hora de inicio de la reservación' },
                            end_time: { type: 'string', format: 'date-time', description: 'Fecha y hora de fin de la reservación' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error del servidor',
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
            "getReservacionesConfirmadasCronograma",
            {}
        );

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/usuario/:id", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Obtiene las reservaciones de un usuario'
    #swagger.summary = 'Obtiene las reservaciones de un usuario'
    #swagger.parameters['id'] = {
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
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idReservacion: { type: 'integer' },
                            idUsuario: { type: 'string' },
                            idSala: { type: 'integer' },
                            idExperiencia: { type: 'integer' },
                            idMesa: { type: 'integer' },
                            horaInicio: { type: 'string', format: 'date-time' },
                            duracion: { type: 'integer' },
                            fecha: { type: 'string', format: 'date-time' },
                            numPersonas: { type: 'integer' }
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
        const usuarioId = req.params.id;
        console.log(`usuarioId: ${usuarioId}`);
        if (usuarioId) {
            const result = await database.executeProcedure(
                "getReservacionByUser",
                { idUsuario: usuarioId }
            );
            console.log(`reserv: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post("/ultimas", async (req, res) => {
    /*
    Documentación de swagger
    */
    try {
        const usuarioId = req.body.user;
        console.log(`userId: ${usuarioId}`);
        if (usuarioId) {
            const result = await database.executeProcedure(
                "getUltimasReservaciones",
                { idUsuario: usuarioId }
            );
            console.log(`Ultimas reservas: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post("/", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Crea una nueva reservación'
    #swagger.summary = 'Crea una nueva reservación'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        idUsuario: { type: 'string' },
                        idSala: { type: 'integer' },
                        idExperiencia: { type: 'integer' },
                        idMesa: { type: 'integer' },
                        horaInicio: { type: 'string', format: 'date-time' },
                        duracion: { type: 'integer' },
                        fecha: { type: 'string', format: 'date-time' },
                        numPersonas: { type: 'integer' }
                    }
                }
            }
        }
    }
    #swagger.responses[201] = {
        description: 'Created',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        rowsAffected: { type: 'integer' }
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
        const reserv = req.body;
        console.log(`reserv: ${JSON.stringify(reserv)}`);
        const rowsAffected = await database.create("Reservaciones", reserv);
        res.status(201).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Obtiene una reservación por su ID'
    #swagger.summary = 'Obtiene una reservación por su ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la reservación',
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
                        idReservacion: { type: 'integer' },
                        idUsuario: { type: 'string' },
                        idSala: { type: 'integer' },
                        idExperiencia: { type: 'integer' },
                        idMesa: { type: 'integer' },
                        horaInicio: { type: 'string', format: 'date-time' },
                        duracion: { type: 'integer' },
                        fecha: { type: 'string', format: 'date-time' },
                        numPersonas: { type: 'integer' }
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
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        if (reservId) {
            const result = await database.read(
                "Reservaciones",
                "idReservacion",
                reservId
            );
            console.log(`reserv: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.put("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Actualiza una reservación por su ID'
    #swagger.summary = 'Actualiza una reservación por su ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la reservación',
        required: true,
        type: 'integer'
    }
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        idUsuario: { type: 'string' },
                        idSala: { type: 'integer' },
                        idExperiencia: { type: 'integer' },
                        idMesa: { type: 'integer' },
                        horaInicio: { type: 'string', format: 'date-time' },
                        duracion: { type: 'integer' },
                        fecha: { type: 'string', format: 'date-time' },
                        numPersonas: { type: 'integer' }
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
                        rowsAffected: { type: 'integer' }
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
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        const reserv = req.body;

        const rowsAffected = await database.update(
            "Reservaciones",
            "idReservacion",
            reservId,
            reserv
        );
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.delete("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Elimina una reservación por su ID'
    #swagger.summary = 'Elimina una reservación por su ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la reservación',
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
                        rowsAffected: { type: 'integer' }
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
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        const rowsAffected = await database.delete(
            "Reservaciones",
            "idReservacion",
            reservId
        );
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
