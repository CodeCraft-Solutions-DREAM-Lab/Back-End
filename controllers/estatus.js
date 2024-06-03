import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/", async (_, res) => {
    /*
    #swagger.tags = ['Estatus']
    #swagger.description = 'Obtiene todos los estatus'
    #swagger.summary = 'Obtiene todos los estatus'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            idEstatus: { type: 'integer' },
                            nombre: { type: 'string' },
                            descripcion: { type: 'string' }
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
        // Regresa todas las experiencias
        const estatus = await database.readAll("Estatus");
        res.status(200).json(estatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
