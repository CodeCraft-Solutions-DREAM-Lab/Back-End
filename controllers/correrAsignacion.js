import express from "express";
import asignarReservaciones from "./schedules/asignarReservaciones.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
    /*
#swagger.tags = ['Reservaciones']
#swagger.description = 'Hacer trigger manual de la función de asignación de reservaciones'
#swagger.summary = 'Trigger de función de asignaciones'
#swagger.responses[200] = {
    description: 'Reservaciones asignadas correctamente.',
    content: {
        'text/html': {
                type: 'Reservaciones asignadas correctamente.',
            }
        }
    }
}
#swagger.responses[500] = {
    description: 'Error al intentar asignar reservaciones.',
    content: {
        'text/html': {
                type: 'Error al intentar asignar reservaciones.',
            }
        }
    }
}
*/
    try {
        await asignarReservaciones();
        res.status(200).send("Reservaciones asignadas correctamente.");
    } catch (err) {
        console.error("Error al intentar asignar reservaciones.", err);
        res.status(500).send(
            "Hubo un error al intentar asignar reservaciones."
        );
    }
});

export default router;