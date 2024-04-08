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
    const usuarios = await database.readAll("Usuarios");
    console.log(`Usuarios: ${JSON.stringify(usuarios)}`);
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

export default router;
