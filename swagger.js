// import swaggerJsdoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// const options = {
//     definition: {
//         openapi: "3.1.0",
//         info: {
//             title: "DREAM Lab API",
//             description:
//                 "Endpoints para la API de DREAM Lab. Puede encontrar más información en [GitHub](https://github.com/CodeCraft-Solutions-DREAM-Lab).",
//             contact: {
//                 name: "CodeCraft Solutions",
//                 url: "https://github.com/CodeCraft-Solutions-DREAM-Lab",
//             },
//             version: "1.0.0",
//         },
//         servers: [
//             {
//                 url: "http://localhost:3000/",
//                 description: "Local server",
//             },
//             {
//                 url: "http://dreamlab-api.azurewebsites.net/",
//                 description: "Live server",
//             },
//         ],
//     },
//     // looks for configuration in specified directories
//     // apis: ["./router/*.js"],
//     apis: ["./controllers/*.js"],
// };

// // Swagger Options
// const swaggerSpec = swaggerJsdoc(options);
// function swaggerDocs(app, port) {
//     // Swagger Page
//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//     // Documentation in JSON format
//     app.get("/docs.json", (req, res) => {
//         res.setHeader("Content-Type", "application/json");
//         res.send(swaggerSpec);
//     });
// }
// export default swaggerDocs;

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const swaggerAutogen = require("swagger-autogen")({ openapi: "3.1.0" });

const doc = {
    info: {
        version: "1.0.0",
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
