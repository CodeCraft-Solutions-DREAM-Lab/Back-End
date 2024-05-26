import request from "supertest";
import express from "express";
import router from "../../controllers/experiencias.js"; // Update the path as necessary
import Database from "../database.js"; // Assuming you have a database.js file

jest.mock("../database.js");

const app = express();
app.use(express.json());
app.use("/", router);

describe("Experiencias API", () => {
    let mockReadAll;
    let mockExecuteProcedure;

    beforeEach(() => {
        mockReadAll = jest.fn();
        mockExecuteProcedure = jest.fn();

        Database.mockImplementation(() => {
            return {
                readAll: mockReadAll,
                executeProcedure: mockExecuteProcedure,
            };
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET / - fetch all experiencias", async () => {
        const mockExperiencias = [
            {
                idExperiencia: 1,
                idUF: 1,
                idSala: 1,
                nombre: "string",
                descripcion: "string",
                esAutoDirigida: true,
                esExclusivaUF: true,
                portadaURL: "string",
                fechaInicio: "2024-05-26T01:32:34.577Z",
                fechaFin: "2024-05-26T01:32:34.577Z",
                horaFin: "2024-05-26T01:32:34.577Z",
            },
        ];
        mockReadAll.mockResolvedValue(mockExperiencias);

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });

    it("GET /autodirigidas - fetch all autodirigidas experiencias", async () => {
        const mockExperiencias = [
            {
                idExperiencia: 1,
                idUF: 1,
                idSala: 1,
                nombre: "string",
                descripcion: "string",
                esAutoDirigida: true,
                esExclusivaUF: true,
                portadaURL: "string",
                fechaInicio: "2024-05-26T01:32:34.577Z",
                fechaFin: "2024-05-26T01:32:34.577Z",
                horaFin: "2024-05-26T01:32:34.577Z",
            },
        ];
        mockReadAll.mockResolvedValue(mockExperiencias);

        const res = await request(app).get("/autodirigidas");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });

    it("GET /:id - fetch experiencia by id", async () => {
        const mockExperiencia = {
            idExperiencia: 1,
            idUF: 1,
            idSala: 1,
            nombre: "string",
            descripcion: "string",
            esAutoDirigida: true,
            esExclusivaUF: true,
            portadaURL: "string",
            fechaInicio: "2024-05-26T01:32:34.577Z",
            fechaFin: "2024-05-26T01:32:34.577Z",
            horaFin: "2024-05-26T01:32:34.577Z",
        };
        mockExecuteProcedure.mockResolvedValue([mockExperiencia]);

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([mockExperiencia]);
    });

    it("POST /UFs - fetch experiencias by user", async () => {
        const mockExperiencias = [
            {
                idExperiencia: 1,
                idUF: 1,
                idSala: 1,
                nombre: "string",
                descripcion: "string",
                esAutoDirigida: true,
                esExclusivaUF: true,
                portadaURL: "string",
                fechaInicio: "2024-05-26T01:32:34.577Z",
                fechaFin: "2024-05-26T01:32:34.577Z",
                horaFin: "2024-05-26T01:32:34.577Z",
            },
        ];
        const mockGrupos = [{ idUsuario: "A01177767", idUF: 1 }];
        mockReadAll
            .mockResolvedValueOnce(mockGrupos) // First call for user groups
            .mockResolvedValueOnce(mockExperiencias); // Second call for experiences

        const res = await request(app).post("/UFs").send({ user: "A01177767" });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });
});
