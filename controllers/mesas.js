

import express from "express";
import { config } from "../config.js";
import Database from "../database.js";


const router = express.Router();
router.use(express.json());


// Create database object
const database = new Database(config);


router.get("/", async (_, res) => {
    try {
      // Return a list of usuarios
      const usuarios = await database.readAll("Mesas");
      console.log(`Mesas: ${JSON.stringify(usuarios)}`);
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });


router.get("/:idSala", async (req, res) => {
    try {
        const salaId = req.params.idSala;
       
        const result = await database.executeQuery(
            `EXEC [dbo].[getMaxCuposBySalaId] @idSala = ${salaId};`
          );
          console.log(`experiencia: ${JSON.stringify(result)}`);
          res.status(200).json(result);
        } catch (err) {
      res.status(500).json({ error: err?.message });
    }
});


export default router;