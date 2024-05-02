import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /perfil/logros/{idUsuario}:
 *  get:
 *    summary: Get achievements by user
 *    tags:
 *     - Perfil
 *    parameters:
 *     - in: path
 *       name: idUsuario
 *       schema:
 *         type: string
 *       required: true
 *       description: ID del usuario del que se obtendrán los logros
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                logros:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      idLogro:
 *                        type: integer
 *                      nombre:
 *                        type: string
 *                      iconoURL:
 *                        type: string
 *                configuracionLogro:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      idLogro:
 *                        type: integer
 *                      nombre:
 *                        type: string
 *                      iconoURL:
 *                        type: string
 *                      colorPreferido:
 *                        type: string
 *                        nullable: true
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.get("/logros/:idUsuario", async (req, res) => {
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

/**
 * @openapi
 * /perfil/logros/{idUsuario}:
 *  post:
 *    summary: Configura el logro y color preferido del usuario
 *    tags:
 *     - Perfil
 *    parameters:
 *     - in: path
 *       name: idUsuario
 *       schema:
 *         type: string
 *       required: true
 *       description: ID del usuario al que se le configurará el logro y color preferido
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idLogro:
 *                type: integer
 *              colorPreferido:
 *                type: string
 *                nullable: true
 *    responses:
 *      204:
 *        description: No Content
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.post("/logros/:idUsuario", async (req, res) => {
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

/**
 * @openapi
 * /perfil/{idUsuario}:
 *  get:
 *    summary: Obtiene todas las salas
 *    tags:
 *     - Perfil
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                recordsets:
 *                  type: array
 *                  items:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        prioridad:
 *                          type: integer
 *                          description: Prioridad del usuario
 *                        nombre:
 *                          type: string
 *                          description: Nombre del usuario
 *                        apellidoP:
 *                          type: string
 *                          description: Apellido paterno del usuario
 *                        apellidoM:
 *                          type: string
 *                          description: Apellido materno del usuario
 *                        apodo:
 *                          type: string
 *                          description: Apodo del usuario
 *                        iconoURL:
 *                          type: string
 *                          format: url
 *                          description: URL del icono del usuario *
 *                recordset:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      idSala:
 *                        type: integer
 *                        description: ID de la sala
 *                      idReservacion:
 *                        type: integer
 *                        description: ID de la reservación
 *                      idExperiencia:
 *                        type: integer
 *                        description: ID de la experiencia
 *                      idMesa:
 *                        type: integer
 *                        description: ID de la mesa
 *                      estatus:
 *                        type: integer
 *                        description: Estatus de la reservación
 *                      horaInicio:
 *                        type: string
 *                        format: date-time
 *                        description: Hora de inicio de la reservación
 *                      duracion:
 *                        type: integer
 *                        description: Duración de la reservación en horas
 *                      fecha:
 *                        type: string
 *                        format: date
 *                        description: Fecha de la reservación
 *                      numPersonas:
 *                        type: integer
 *                        description: Número de personas en la reservación
 *                      nombre_experiencia:
 *                        type: string
 *                        description: Nombre de la experiencia asociada a la sala
 *                      nombre_sala:
 *                        type: string
 *                        description: Nombre de la sala
 *                output:
 *                  type: object
 *                  description: Información adicional de salida
 *                rowsAffected:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: Filas afectadas
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Mensaje de error
 */
router.get("/:idUsuario", async (req, res) => {
    try {
        const usuarioId = req.params.idUsuario;

        const result = await database.executeQuery(
            `EXEC [dbo].[getPerfilUsuario] @idUsuario = ${usuarioId};`
        );

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
