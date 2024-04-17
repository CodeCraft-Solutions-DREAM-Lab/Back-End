import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

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

// SUPER IMPORTANTE QUE LA RUTA DE AUTO DIRIGIDAS ESTE ANTES DE LA RUTA EN LA
// QUE SE PASA EL ID, SINO PIENSA QUE EL ID ES "autodirigidas"
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
