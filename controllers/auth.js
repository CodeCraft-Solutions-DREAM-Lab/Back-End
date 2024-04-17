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
        res.status(500).json({});
    }
});

router.post("/token", async (req, res) => {
    const { token } = req.body;

    try {
        var decoded = jwt.verify(token, TOKEN_SECRET);
        res.status(200).json(true);
    } catch (err) {
        res.status(500).json(false);
    }
});

export default router;
