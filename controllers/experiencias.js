import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /experiencias:
 *  get:
 *    summary: Obtiene todas las experiencias
 *    tags:
 *     - Experiencias
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
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
router.get("/", async (_, res) => {
    try {
        // Regresa todas las experiencias
        const experiencias = await database.readAll("Experiencias");
        //console.log(`Experiencias: ${JSON.stringify(experiencias)}`);
        res.status(200).json(experiencias);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /experiencias/autodirigidas:
 *  get:
 *    summary: Obtiene todas las experiencias autodirigidas
 *    tags:
 *     - Experiencias
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
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
router.get("/autodirigidas", async (_, res) => {
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

/**
 * @openapi
 * /experiencias/{id}:
 *  get:
 *    summary: Obtiene una experiencia por su ID
 *    tags:
 *     - Experiencias
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID de la experiencia
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *      404:
 *        description: Not Found
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
router.get("/:id", async (req, res) => {
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

/**
 * @openapi
 * /experiencias/UFs:
 *  post:
 *    summary: Obtiene las experiencias de las UFs de un usuario
 *    tags:
 *     - Experiencias
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  name:
 *                    type: string
 *                  description:
 *                    type: string
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
router.post("/UFs", async (req, res) => {
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
