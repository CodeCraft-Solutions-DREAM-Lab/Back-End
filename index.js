import express from "express";
import { config } from "./config.js";
import Database from "./database.js";
import { router } from "./routes/routes.js";

const port = process.env.PORT || 3000;

const app = express();

// Utilizar las rutas definidas en routes
app.use(router);

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
