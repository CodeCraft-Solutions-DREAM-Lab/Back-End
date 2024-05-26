import express from "express";
import { router } from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import scheduler from "./scheduledTasks/scheduler.js";

dotenv.config({ path: ".env.development", encoding: "latin1" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(router);
app.use(bodyParser.json());

for (const key in scheduler) {
    scheduler[key]();
}

export default app;
