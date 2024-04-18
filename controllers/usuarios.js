import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /usuarios:
 *  get:
 *    summary: Obtiene todos los usuarios
 *    tags:
 *     - Usuarios
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
 *                  idUsuario:
 *                    type: string
 *                  nombre:
 *                    type: string
 *                  apellidoP:
 *                    type: string
 *                  apellidoM:
 *                    type: string
 *                  tipo:
 *                    type: string
 *                  prioridad:
 *                    type: integer
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
        // Return a list of usuarios
        const usuarios = await database.readAll("Usuarios");
        console.log(`Usuarios: ${JSON.stringify(usuarios)}`);
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
