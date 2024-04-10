import express from "express";
import { router } from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const port = process.env.PORT || 3000;

const app = express();

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

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
