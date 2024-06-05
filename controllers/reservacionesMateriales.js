import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.post("/changeEstatus", async (req, res) => {

    /*
    #swagger.tags = ['ReservacionesMateriales']
    #swagger.description = 'Cambia el estatus del un material en una reservación'
    #swagger.summary = 'Cambia el estatus de un material'
    #swagger.responses[200] = {
        description: 'OK',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: "Se cambió el estatus exitosamente"}
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

    const { idReservacion, idMaterial, idEstatus } = req.body;

    try {
        await database.executeProcedure(
        "setReservacionMaterialEstatus", 
        {
            idReservacion, 
            idMaterial, 
            idEstatus
        });
        res.status(200).json({ message: "Se cambió el estatus exitosamente" });
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }    
});

export default router;
