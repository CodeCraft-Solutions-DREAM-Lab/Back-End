import { createRequire } from "module";
const require = createRequire(import.meta.url);

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.1.0" });

const doc = {
    info: {
        version: "2.0.0",
        title: "DREAM Lab API",
        description:
            "Endpoints para la API de DREAM Lab. Puede encontrar más información en [GitHub](https://github.com/CodeCraft-Solutions-DREAM-Lab).",
        contact: {
            name: "CodeCraft Solutions",
            url: "https://github.com/CodeCraft-Solutions-DREAM-Lab",
        },
    },
    servers: [
        {
            url: "http://localhost:3000/",
            description: "Local server",
        },
        {
            url: "http://dreamlab-api.azurewebsites.net/",
            description: "Live server",
        },
    ],
};

const outputFile = "./swagger.json";
const routes = ["./index.js"];

swaggerAutogen(outputFile, routes, doc);
