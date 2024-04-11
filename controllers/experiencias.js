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

export default router;