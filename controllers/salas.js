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
        res.status(200).json(salas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

router.get("/horasLibres", async (req, res) => {
    try {
        const { idSala, fecha, personas } = req.body;

        if (!idSala || !fecha) {
            res.status(400).json({ error: "idSala and fecha are required" });
            return;
        }

        if (!personas) personas = 1;

        const resultReservs = await database.executeQuery(
            `EXEC [dbo].[getReservacionesFromSalaByDate] @idSala = ${idSala}, @fecha = '${fecha}';`
        );

        const resultMesas = await database.executeQuery(
            `EXEC [dbo].[getMesasFromSalaByCupo] @idSala = ${idSala}, @cupos = ${personas};`
        );

        const mesasIdsArray = [];
        for (const recordset of resultMesas.recordsets[0]) {
            mesasIdsArray.push(recordset.idMesa);
        }

        const availabilityArray = [];
        for(let i = 0; i <= 24; i++) {
            availabilityArray.push([...mesasIdsArray]);
        }

        resultReservs.recordsets[0].forEach((reserv) => {
            const hora = reserv.horaInicio.getHours()+6; // UTC-6
            const duracion = reserv.duracion;
        
            for (let i = 0; i < duracion; i++) {    
                const index = availabilityArray[hora + i].indexOf(reserv.idMesa);
                console.log(index);
                if (index > -1) {
                    availabilityArray[hora + i].splice(index, 1);
                }
            }
        });

        const freeHoursArray = [];

        for (let i = 9; i <= 18; i++) {
            if (availabilityArray[i].length > 0) {
                freeHoursArray.push(i);
            }
        }
        
        return res.status(200).json(freeHoursArray);

    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;