import express from "express";
import sha512 from "js-sha512";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json());

import { config } from "../config.js";
import Database from "../database.js";
const database = new Database(config);

const TOKEN_SECRET = process.env.TOKEN_SECRET;

router.post("/usuario", async (req, res) => {
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Autentica un usuario'
    #swagger.summary = 'Autentica un usuario'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        usuario: { type: 'string', example: 'test' },
                        contrasena: { type: 'string', example: 'test' },
                        origen: { type: 'string', example: 'qr' },
                        tagId: { type: 'string', example: 'test' }
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
                        jwt: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYTAxMTc3NzY3IiwiaWF0IjoxNzE1NzUzNzQzfQ.ml-vMvWq5X8_FdILT9YIPv0oPc9Wlvj3f_N4VhHCAZA' }
                    }
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Unauthorized',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Not Found',
        content: {
            'application/json': {
                schema: {
                    type: 'object'
                }
            }
        }
    }
    */
    try {
        let { usuario, contrasena, origen, tagId } = req.body;
        console.log(req.body);
        origen = origen ? origen.toLowerCase() : null;
        console.log(origen);

        if (!origen || origen !== "qr") {
            usuario = usuario.toLowerCase();
            console.log(usuario);
            const shaPasword = sha512(String(contrasena));
            console.log(shaPasword);

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
                console.log("TOKEN_SECRET:", TOKEN_SECRET);
                var token = jwt.sign(
                    { usuario: result.idUsuario.toLowerCase() },
                    TOKEN_SECRET,
                    {
                        expiresIn: "7d",
                    }
                );
                console.log(token);
                res.status(200).json({ jwt: token });
            }
        } else {
            tagId = tagId.toLowerCase();
            const result = await database.readStringId(
                "Credenciales",
                "tagId",
                tagId
            );

            if (result.length === 0) {
                res.status(404).json({});
            } else {
                var token = jwt.sign(
                    { usuario: result.idUsuario.toLowerCase() },
                    TOKEN_SECRET,
                    {
                        expiresIn: "10m",
                    }
                );
                res.status(200).json({ jwt: token });
            }
        }
    } catch (err) {
        res.status(401).json({});
    }
});

router.post("/token", async (req, res) => {
    /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Verifica un token'
    #swagger.summary = 'Verifica un token'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYTAxMTc3NzY3IiwiaWF0IjoxNzE1NzUzNzQzfQ.ml-vMvWq5X8_FdILT9YIPv0oPc9Wlvj3f_N4VhHCAZA' }
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
                        isAuth: { type: 'boolean', example: true },
                        token_data: { type: 'object' }
                    }
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Unauthorized',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        isAuth: { type: 'boolean', example: false }
                    }
                }
            }
        }
    }
    */
    const { token } = req.body;

    try {
        var decoded = jwt.verify(token, TOKEN_SECRET);
        res.status(200).json({ isAuth: true, token_data: decoded });
    } catch (err) {
        res.status(401).json({ isAuth: false });
    }
});

export default router;
