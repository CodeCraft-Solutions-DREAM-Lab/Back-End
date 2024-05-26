import express from "express";

export default function server(router, mockDatabase) {
    const app = express();
    app.use(express.json());
    app.use("/", router(mockDatabase));

    return app;
}
