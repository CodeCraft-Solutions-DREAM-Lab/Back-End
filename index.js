import express from "express";
import { router } from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import scheduler from "./scheduledTasks/scheduler.js";

dotenv.config({ path: ".env.development", encoding: "latin1" });

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

// Scheduled tasks
for (const key in scheduler) {
    scheduler[key]();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonPath = path.resolve(__dirname, "swagger.json");
const jsonString = fs.readFileSync(jsonPath, "utf8");
const swaggerDocs = JSON.parse(jsonString);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(port, () => {
    console.log(
        "\n\n\n========================================================="
    );
    console.log(`|     Servidor disponible en http://localhost:${port}      |`);
    console.log(`| Documentación de la API en http://localhost:${port}/docs |`);
    console.log(
        "=========================================================\n\n\n"
    );
});

export default app;
