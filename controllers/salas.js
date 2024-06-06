import express from "express";
import { config } from "../config.js";
import Database from "../database.js";
const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/", async (_, res) => {
    /*
    #swagger.tags = ['Salas']
    #swagger.description = 'Obtiene todas las salas'
    #swagger.summary = 'Obtiene todas las salas'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idSala: { type: 'integer' },
                            nombre: { type: 'string' },
                            cantidadMesas: { type: 'integer' },
                            descripcion: { type: 'string' },
                            fotoURL: { type: 'string' },
                            detallesURL: { type: 'string' }
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
        // Regresa todas las salas
        const salas = await database.readAll("Salas");
        res.status(200).json(salas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/cronograma", async (_, res) => {
    /*
    #swagger.tags = ['Salas']
    #swagger.description = 'Obtiene el cronograma de salas y mesas intercaladas'
    #swagger.summary = 'Obtiene el cronograma de salas y mesas intercaladas'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer', description: 'Identificador único de la sala o mesa' },
                            title: { type: 'string', description: 'Nombre de la sala o mesa' },
                            sala: { type: 'boolean', description: 'Indica si es una sala (true) o una mesa (false)' },
                            idSala: { type: 'integer', description: 'Identificador de la sala a la que pertenece la mesa' }
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
            "GetSalasYMesasIntercaladasCronograma",
            {}
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post("/horasLibres", async (req, res) => {
    /*
    #swagger.tags = ['Salas']
    #swagger.description = 'Obtiene las horas libres de una sala'
    #swagger.summary = 'Obtiene las horas libres de una sala'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        idSala: { type: 'integer' },
                        fecha: { type: 'string', format: 'date' },
                        personas: { type: 'integer' }
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
                            hora: { type: 'integer' },
                            cupos: { type: 'integer' },
                            competidores: { type: 'integer' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'Bad Request',
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
        let { idSala, fecha, personas } = req.body;

        if (!idSala || !fecha) {
            res.status(400).json({ error: "idSala and fecha are required" });
            return;
        }

        if (!personas) personas = 1;

        const resultReservsConfirmadas = await database.executeQuery(
            `EXEC [dbo].[getReservacionesWithStatusFromSalaByDate] @idSala = ${idSala}, @fecha = '${fecha}', @idEstatus = ${3};`
        );

        const resultReservsPendientes = await database.executeQuery(
            `EXEC [dbo].[getReservacionesWithStatusFromSalaByDate] @idSala = ${idSala}, @fecha = '${fecha}', @idEstatus = ${5};`
        );

        const resultMesas = await database.executeQuery(
            `EXEC [dbo].[getMesasFromSalaByCupo] @idSala = ${idSala}, @cupos = ${personas};`
        );

        const mesasIdsArray = [];
        for (const recordset of resultMesas.recordsets[0]) {
            mesasIdsArray.push(recordset.idMesa);
        }

        const availabilityArray = [];
        for (let i = 0; i <= 24; i++) {
            availabilityArray.push([...mesasIdsArray]);
        }

        const competidoresArray = Array(25).fill(0);

        resultReservsPendientes.recordsets[0].forEach((reserv) => {
            const hora = (reserv.horaInicio.getHours() + 6) % 24; // UTC-6
            // const hora = reserv.horaInicio.getHours() + 6; // UTC-6
            const duracion = reserv.duracion;

            for (let i = 0; i < duracion; i++) {
                competidoresArray[hora + i] += 1;
            }
        });

        resultReservsConfirmadas.recordsets[0].forEach((reserv) => {
            const hora = (reserv.horaInicio.getHours() + 6) % 24; // UTC-6
            const duracion = reserv.duracion;

            for (let i = 0; i < duracion; i++) {
                const index = availabilityArray[hora + i].indexOf(
                    reserv.idMesa
                );
                if (index > -1) {
                    availabilityArray[hora + i].splice(index, 1);
                }
            }
        });

        const freeHoursArray = [];

        for (let i = 9; i <= 18; i++) {
            if (availabilityArray[i].length > 0) {
                freeHoursArray.push({
                    hora: i,
                    cupos: availabilityArray[i].length,
                    competidores: competidoresArray[i],
                });
            }
        }

        return res.status(200).json(freeHoursArray);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});



router.put("/cambiarEstadoSalas", async (req, res) => {
    /*
    #swagger.tags = ['Salas']
    #swagger.description = 'Cambia el estado de bloqueada de una sala de true a false y viceversa'
    #swagger.summary = 'Cambia el estado de bloqueada de una sala'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        idSala: { type: 'integer' }
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
    #swagger.responses[400] = {
        description: 'Bad Request',
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
        let { idSala } = req.body;

        if (!idSala) {
            res.status(400).json({ error: "idSala is required" });
            return;
        }

        await database.executeQuery(
            `EXEC [dbo].[toggleEstadoFromSala] @idSala = ${idSala};`
        );

        res.status(200).json({ mensaje: "Disponibilidad de sala modificada exitosamente" });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Salas']
    #swagger.description = 'Obtiene una sala por su ID'
    #swagger.summary = 'Obtiene una sala por su ID'
    #swagger.parameters['id'] = {
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
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idSala: { type: 'integer' },
                            nombre: { type: 'string' },
                            cantidadMesas: { type: 'integer' },
                            descripcion: { type: 'string' },
                            fotoURL: { type: 'string' },
                            detallesURL: { type: 'string' }
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
        const salaId = req.params.id;
        console.log(`salaId: ${salaId}`);
        if (salaId) {
            const result = await database.executeProcedure("getSalaById", {
                idSala: salaId,
            });
            console.log(`sala: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/nameFromExperienceId/:id", async (req, res) => {
    /*
    #swagger.tags = ['Salas']
    #swagger.description = 'Regresa el nombre de una sala basado en el ID de la experiencia'
    #swagger.summary = 'Regresa el nombre de una sala basado en el ID de la experiencia'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la experiencia',
        required: true,
        type: 'integer',
        example: 1
    }
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string', example: 'Electric Garage' }
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
        const experienceId = req.params.id;
        console.log(`experienceId: ${experienceId}`);
        if (experienceId) {
            const result = await database.executeProcedure(
                "getSalaNameFromExperienceId",
                {
                    idExperiencia: experienceId,
                }
            );

            res.status(200).json({
                nombre: result[0].nombre,
            });
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
