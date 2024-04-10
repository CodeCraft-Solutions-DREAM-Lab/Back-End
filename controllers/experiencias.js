import express from 'express';
import { config } from '../config.js';
import Database from '../database.js';
const router = express.Router();
router.use(express.json());
// Create database object
const database = new Database(config);
router.get('/', async (_, res) => {
    try {
        // Regresa todas las experiencias
        const experiencias = await database.readAll("Experiencias");
        console.log(`Experiencias: ${JSON.stringify(experiencias)}`);
        res.status(200).json(experiencias);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

// Obtiene solo las experiencias autodirigidas
router.get('/autodirigidas', async (_, res) => {
    try {
        // Leer todas las experiencias de la base de datos
        const experiencias = await database.readAll("Experiencias");
        
        // Filtrar las experiencias para obtener solo las autodirigidas
        const experienciasAutodirigidas = experiencias.filter(experiencia => experiencia.esAutodirigida === 1);
        
        res.status(200).json(experienciasAutodirigidas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

// Obtiene las experiencias de las UF del usuario
router.get('/UFs', async (req, res) => {
    try {
        const idUsuario = req.idUsuario;
        const ufsUsuario = await database.readAndConditions(
            "GruposUsuarios",
            [{ idName: "idUsuario", id: idUsuario }],
            "idUF"
        );
        const experienciasUsuario = await Promise.all(ufsUsuario.map(async (uf) => {
            const experienciasUF = await database.readAndConditions(
                "Experiencias",
                [{ idName: "idUF", id: uf }],
                "*"
            );
            return experienciasUF;
        }));
        const todasExperienciasUsuario = experienciasUsuario.reduce((acc, val) => acc.concat(val), []);
        res.status(200).json(todasExperienciasUsuario);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;