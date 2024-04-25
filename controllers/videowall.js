import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get("/reservaciones", async (req, res) => {
    try {
        const result = await database.executeProcedure(
            "getReservacionesByStatus",
            { estatus: 3 }
        );
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send(`Error: ${error}`);
    }
});

export default router;
