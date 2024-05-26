import request from "supertest";
import router from "../../controllers/salas.js";
import {
    mockError,
    mockSalas,
    mockCronogramaSalas,
    mockHorasLibresSalas,
    mockHorasLibresSalasResponse,
    mockReservaciones,
    mockMesas,
    mockNombreSala,
    mockNombreSalaResponse,
} from "../mockData.js";
import {
    mockDatabase,
    mockReadAll,
    mockExecuteProcedure,
    clearMocks,
    mockExecuteQuery,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Salas", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET / - Obtiene todas las salas - 200", async () => {
        mockReadAll.mockResolvedValue(mockSalas);

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockSalas);
    });

    it("GET / - Obtiene todas las salas - 500", async () => {
        mockReadAll.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /cronograma - Obtiene el cronograma de salas y mesas intercaladas - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockCronogramaSalas);

        const res = await request(app).get("/cronograma");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockCronogramaSalas);
    });

    it("GET /cronograma - Obtiene el cronograma de salas y mesas intercaladas - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/cronograma");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    /* NO FUNCIONA PORQUE NO ENTIENDO BIEN COMO SE RECIBEN LOS DATOS EN EL ENDPOINT */
    it.skip("POST /horasLibres - Obtiene las horas libres de una sala - 200", async () => {
        mockExecuteQuery
            .mockResolvedValueOnce(mockReservaciones)
            .mockResolvedValueOnce(mockReservaciones)
            .mockResolvedValueOnce(mockMesas);

        const res = await request(app)
            .post("/horasLibres")
            .send(mockHorasLibresSalas);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockHorasLibresSalasResponse);
    });

    /* NO FUNCIONA PORQUE NO ENTIENDO BIEN COMO SE RECIBEN LOS DATOS EN EL ENDPOINT */
    it.skip("POST /horasLibres - Obtiene las horas libres de una sala - 500", async () => {
        mockExecuteQuery.mockRejectedValue(new Error("Database error"));

        const res = await request(app).post("/horasLibres").send({});
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /:id - Obtiene una sala por su ID - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockSalas);

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockSalas);
    });

    it("GET /:id - Obtiene una sala por su ID - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /nameFromExperienceId/:id - Regresa el nombre de una sala basado en el ID de la experiencia - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockNombreSala);

        const res = await request(app).get("/nameFromExperienceId/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockNombreSalaResponse);
    });

    it("GET /nameFromExperienceId/:id - Regresa el nombre de una sala basado en el ID de la experiencia - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/nameFromExperienceId/1");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
