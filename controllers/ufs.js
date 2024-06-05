import express from "express";
import { config } from "../config.js";
import Database from "../database.js";
const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/", async (_, res) => {
    /*
    #swagger.tags = ['Unidades de Formación']
    #swagger.description = 'Obtiene todas las unidades de formación'
    #swagger.summary = 'Obtiene todas las unidades de formación'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idUF: { type: 'integer' },
                            nombre: { type: 'string' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    try {
        // Regresa todas las ufs
        const salas = await database.readAll("UnidadesFormacion");
        res.status(200).json(salas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;