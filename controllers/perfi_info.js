import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());


/**
 * @openapi
 * /perfil_info:
 *  get:
 *    summary: Obtiene todas las salas
 *    tags:
 *     - Perfil_info
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
// Create database object
const database = new Database(config);

router.get("/:idUsuario", async (req, res) => {
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