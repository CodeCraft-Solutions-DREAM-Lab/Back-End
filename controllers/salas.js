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
        console.log(`Salas: ${JSON.stringify(salas)}`);
        res.status(200).json(salas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
      const salaId = req.params.id;
      console.log(`salaId: ${salaId}`);
      if (salaId) {
        const result = await database.executeQuery(
          `EXEC [dbo].[getSalaById] @idSala = ${salaId};`
        );
        console.log(`sala: ${JSON.stringify(result)}`);
        res.status(200).json(result.recordset);
      } else {
        res.status(404);
      }
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });

export default router;

