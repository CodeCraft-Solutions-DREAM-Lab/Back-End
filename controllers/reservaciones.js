import express from 'express';
import { config } from '../config.js';
import Database from '../database.js';

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get('/', async (_, res) => {
    try {
        // Return a list of reservaciones
        const reservaciones = await database.readAll("Reservaciones");
        console.log(`Usuarios: ${JSON.stringify(reservaciones)}`);
        res.status(200).json(reservaciones);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const reserv = req.body;
        console.log(`reserv: ${JSON.stringify(reserv)}`);
        const rowsAffected = await database.create("Reservaciones", reserv);
        res.status(201).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        if (reservId) {
            const result = await database.read("Reservaciones", "idReservacion" , reservId);
            console.log(`reserv: ${JSON.stringify(result)}`);
            res.status(200).json(result);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        const reserv = req.body;

        const rowsAffected = await database.update("Reservaciones", "idReservacion", reservId, reserv);
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const reservId = req.params.id;
        console.log(`reservId: ${reservId}`);
        const rowsAffected = await database.delete("Reservaciones", "idReservacion", reservId);
        res.status(200).json({ rowsAffected });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
