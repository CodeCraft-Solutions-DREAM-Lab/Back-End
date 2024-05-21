import express from "express";
import { router } from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import swaggerDocs from "./swagger.js";
import scheduleReservations from './scheduledTasks/scheduler.js';

dotenv.config({ path: ".env.development" });

const app = express();

const port = process.env.PORT || 3000;

// Para poder trabajar con JSONS
app.use(express.json());
// Para escribir datos en el body al hacer post o put
// Si llegaramos a necesitar objetos mas complejos, poner extended en true
app.use(express.urlencoded({ extended: false }));

// Para poder hacer peticiones desde cualquier origen
app.use(cors());

// Utilizar las rutas definidas en routes
app.use(router);

// Para poder leer el body de las solicitudes http
app.use(bodyParser.json());

swaggerDocs(app, port);

// Para hacer el ordenamiento y asignación de reservaciones cada 3 horas
scheduleReservations();

// Check if the script is being run by Jest
const isRunningTest = process.argv.some((arg) => arg.includes("jest"));

if (!isRunningTest) {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
} else {
    module.exports = app;
}
