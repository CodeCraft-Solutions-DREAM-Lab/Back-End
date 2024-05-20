import express from "express";
import { config } from "../config.js";
import Database from "../database.js";
import sha512 from "js-sha512";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);
const TOKEN_SECRET = process.env.TOKEN_SECRET;

/**
 * @openapi
 * /auth/usuario:
 *  post:
 *    summary: Autentica un usuario
 *    tags:
 *     - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              usuario:
 *                type: string
 *                example: test
 *              contrasena:
 *                type: string
 *                example: test
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                jwt:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYTAxMTc3NzY3IiwiaWF0IjoxNzE1NzUzNzQzfQ.ml-vMvWq5X8_FdILT9YIPv0oPc9Wlvj3f_N4VhHCAZA
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.post("/usuario", async (req, res) => {
    try {
        let { usuario, contrasena, origen } = req.body;
        usuario = usuario.toLowerCase();
        origen = origen ? origen.toLowerCase() : null;

        if (!origen || origen !== "qr") {
            const shaPasword = sha512(String(contrasena));

            const result = await database.readAndConditions(
                "Credenciales",
                [
                    { idName: "idUsuario", id: usuario },
                    { idName: "contrasena", id: shaPasword },
                ],
                "idUsuario"
            );

            if (result.length === 0) {
                res.status(404).json({});
            } else {
                var token = jwt.sign({ usuario: usuario }, TOKEN_SECRET, {
                    expiresIn: "7d",
                });
                res.status(200).json({ jwt: token });
            }
        } else {
            const result = await database.readStringId(
                "Credenciales",
                "idUsuario",
                usuario
            );

            if (result.length === 0) {
                res.status(404).json({});
            } else {
                var token = jwt.sign({ usuario: usuario }, TOKEN_SECRET, {
                    expiresIn: "10m",
                });
                res.status(200).json({ jwt: token });
            }
        }
    } catch (err) {
        res.status(401).json({});
    }
});

/**
 * @openapi
 * /auth/token:
 *  post:
 *    summary: Verifica un token
 *    tags:
 *     - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYTAxMTc3NzY3IiwiaWF0IjoxNzE1NzUzNzQzfQ.ml-vMvWq5X8_FdILT9YIPv0oPc9Wlvj3f_N4VhHCAZA
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: boolean
 *              example: true
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: boolean
 *              example: false
 */
router.post("/token", async (req, res) => {
    const { token } = req.body;

    try {
        var decoded = jwt.verify(token, TOKEN_SECRET);
        res.status(200).json({ isAuth: true, token_data: decoded });
    } catch (err) {
        res.status(401).json({ isAuth: false });
    }
});

router.get("/test", async (req, res) => {
    const result = await database.executeProcedure("getSalasDisponibles");
    res.status(200).json(result);
});

export default router;
