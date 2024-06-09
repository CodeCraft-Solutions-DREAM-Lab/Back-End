import express from "express";
import { config } from "../config.js";
import Database from "../database.js";
import { getHtmlTemplate, sendEmail } from "../emails/nodemailer.js";

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
            "getReservacionesConfirmadasCronograma"
        );

        result.map((reserv) => {
            // Si se recibe un nombre alterno, reemplazar el nombre original por el alterno
            if (reserv.nombreAlterno) {
                reserv.title = reserv.nombreAlterno;
            }
            // Remover el nombre alterno de la respuesta
            delete reserv.nombreAlterno;
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/cronogramaSingle/:idReservacion", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Obtiene una reservación para el cronograma'
    #swagger.summary = 'Obtiene una reservación para el cronograma'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
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
            "getReservacionCronograma",
            {
                idReservacion: req.params.idReservacion,
            }
        );

        // Si se recibe un nombre alterno, reemplazar el nombre original por el alterno
        if (result[0].nombreAlterno) {
            result[0].title = result[0].nombreAlterno;
        }
        // Remover el nombre alterno de la respuesta
        delete result[0].nombreAlterno;

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/cronograma/:id", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Obtiene la información de una reservación para el modal de información del cronograma'
    #swagger.summary = 'Obtiene la información de una reservación para el cronograma'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        studentName: { type: 'string', example: 'Christopher Gabriel Pedraza Pohlenz' },
                        'studentMat': { type: 'string', example: 'A01177767' },
                        'salaName': { type: 'string', example: 'Dimension Forge' },
                        'reservDate': { type: 'string', example: '2024-01-05T00:00:00.000Z' },
                        'horaInicio': { type: 'string', example: '1970-01-01T12:00:00.000Z' },
                        'duracion': { type: 'integer', example: 3 },
                        'reservItems': {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: 
                                {
                                    'idReservacion': { type: 'integer', example: 1 },
                                    'idMaterial': { type: 'integer', example: 1 },
                                    'name': { type: 'string', example: 'Laptop Gamer' },
                                    'quantity': { type: 'integer', example: 5 },
                                    'estatus': { type: 'integer', example: 1 }
                                }
                            }
                        },
                        'selectedItems': {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: 
                                {
                                    'name': { type: 'string', example: 'Laptop Gamer' },
                                    'quantity': { type: 'integer', example: 5 },
                                }
                            }
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
        const reservId = req.params.id;
        const infoResult = await database.executeProcedure(
            "getReservInfoById",
            { idReservacion: reservId }
        );

        const reservItems = await database.executeProcedure(
            "getItemsToPrepareWithReservId",
            { idReservacion: reservId }
        );

        const selectedItems = await database.executeProcedure(
            "getPreparedItemsWithReservId",
            { idReservacion: reservId }
        );

        // Si se recibe un nombre alterno, reemplazar el nombre original por el alterno
        if (infoResult[0].nombreAlterno) {
            infoResult[0].studentName = infoResult[0].nombreAlterno;
        }
        // Remover el nombre alterno de la respuesta
        delete infoResult[0].nombreAlterno;

        res.status(200).json({ ...infoResult[0], reservItems, selectedItems });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post("/cancelar", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Cancela una reservación y agrega puntos de prioridad al usuario'
    #swagger.summary = 'Cancela una reservación'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        idReservacion: { type: 'integer', example: 2 },
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
                        message: { type: 'string', example: 'Reservación cancelada exitosamente' }
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
                        message: { type: 'string', example: 'idReservacion is required' }
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
        const { idReservacion } = req.body;

        if (!idReservacion) {
            res.status(400).json({
                error: "idReservacion is required",
            });
            return;
        }

        await database.executeProcedure("setEstatusFromReservacion", {
            idReservacion,
            idEstatus: 4,
        });

        const userResult = await database.executeProcedure(
            "getUserIdByReservId",
            {
                idReservacion,
            }
        );
        const userId = userResult[0].idUsuario;

        await database.executeProcedure("addPrioridadToUser", {
            idUsuario: userId,
            prioridad: 10,
        });

        const currentDate = new Date();
        const sqlDate = currentDate.toISOString().split("T")[0];

        const mensaje = "Tus puntos de prioridad han aumentado.";
        const motivo = "Un administrador ha cancelado tu reservación.";

        await database.executeProcedure("insertIntoHistorialPrioridad", {
            idUsuario: userId,
            fecha: sqlDate,
            motivo,
            prioridad: 10,
        });

        const htmlTemplate = getHtmlTemplate("updatedPriorityPoints", {
            mensaje: mensaje,
            motivo: motivo,
        });

        sendEmail(
            `${userId.toUpperCase()}@tec.mx`,
            "Lamentamos el inconveniente",
            "",
            htmlTemplate
        );

        res.status(200).json({ mensaje: "Reservación cancelada exitosamente" });
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

router.get("/salasActuales", async (req, res) => {
    /*
    #swagger.tags = ['Reservaciones']
    #swagger.description = 'Obtiene las reservaciones de la fecha actual en adelante de una sala'
    #swagger.summary = 'Obtiene las reservaciones siguientes de una sala'
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
        const idSala = req.body.idSala;
        console.log(`idSala: ${idSala}`);
        if (idSala) {
            const result = await database.executeProcedure(
                "getProximasReservacionesBySala",
                { idSala: idSala }
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
        reserv.estatusMateriales = 1;
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
