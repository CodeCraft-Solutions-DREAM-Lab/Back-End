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
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiQTAxMTc3NzY3IiwiaWF0IjoxNzEyNjMzMjU2fQ.-ky8LBLfLFCRmENvP0QetksCFuN9D5R0OGC9NiN2WD0
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
        const { usuario, contrasena } = req.body;
        const shaPasword = sha512(String(contrasena));

        console.log(usuario, contrasena, shaPasword);

        const result = await database.readAndConditions(
            "Credenciales",
            [
                { idName: "idUsuario", id: usuario },
                { idName: "contrasena", id: shaPasword },
            ],
            "idUsuario"
        );

        console.log(result);

        if (result.length === 0) {
            res.status(404).json({});
        } else {
            req.params.idUsuario = usuario; // Guarda el idUsuario en el objeto de req
            var token = jwt.sign({ usuario: usuario }, TOKEN_SECRET, {
                expiresIn: "7d",
            });
            console.log("Token: ", token);
            res.status(200).json({ jwt: token });
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
 *                example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiQTAxMTc3NzY3IiwiaWF0IjoxNzEyNjMzMjU2fQ.-ky8LBLfLFCRmENvP0QetksCFuN9D5R0OGC9NiN2WD0
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
        res.status(200).json({ isAuth: true });
    } catch (err) {
        res.status(401).json({ isAuth: false });
    }
});

export default router;
