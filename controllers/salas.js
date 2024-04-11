import express from 'express';
import { config } from '../config.js';
import Database from '../database.js';
const router = express.Router();
router.use(express.json());
// Create database object
const database = new Database(config);
router.get('/', async (_, res) => {
    try {
        // Regresa todas las salas
        const salas = await database.readAll("Salas");
        //console.log(`Salas: ${JSON.stringify(salas)}`);
        res.status(200).json(salas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;