import request from "supertest";
import router from "../../controllers/reservaciones.js";
import {
    mockReservaciones,
    mockReservacion,
    mockError,
    mockCronograma,
    mockRowsAffectedReservaciones,
} from "../mockData.js";
import {
    mockDatabase,
    mockReadAll,
    mockExecuteProcedure,
    mockCreate,
    clearMocks,
    mockRead,
    mockUpdate,
    mockDelete,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Reservaciones", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET / - Obtiene todas las reservaciones - 200", async () => {
        mockReadAll.mockResolvedValue(mockReservaciones);

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockReservaciones);
    });

    it("GET / - Obtiene todas las reservaciones - 500", async () => {
        mockReadAll.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("POST / - Crea una nueva reservación - 200", async () => {
        mockCreate.mockResolvedValue(mockReservacion);

        const res = await request(app).post("/").send(mockReservacion);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(mockRowsAffectedReservaciones);
    });

    it("POST / - Crea una nueva reservación - 500", async () => {
        mockCreate.mockRejectedValue(new Error("Database error"));

        const res = await request(app).post("/");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /cronograma - Obtiene todas las reservaciones confirmadas para el cronograma - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockCronograma);

        const res = await request(app).get("/cronograma");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockCronograma);
    });

    it("GET /cronograma - Obtiene todas las reservaciones confirmadas para el cronograma - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/cronograma");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /usuario/:id - Obtiene las reservaciones de un usuario - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockReservaciones);

        const res = await request(app).get("/usuario/test");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockReservaciones);
    });

    it("GET /usuario/:id - Obtiene las reservaciones de un usuario - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/usuario/test");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /:id - Obtiene una reservación por su ID - 200", async () => {
        mockRead.mockResolvedValue(mockReservacion);

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockReservacion);
    });

    it("GET /:id - Obtiene una reservación por su ID - 500", async () => {
        mockRead.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("PUT /:id - Actualiza una reservación por su ID - 200", async () => {
        mockUpdate.mockResolvedValue(mockReservacion);

        const res = await request(app).put("/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockRowsAffectedReservaciones);
    });

    it("PUT /:id - Actualiza una reservación por su ID - 500", async () => {
        mockUpdate.mockRejectedValue(new Error("Database error"));

        const res = await request(app).put("/1");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("DELETE /:id - Actualiza una reservación por su ID - 200", async () => {
        mockDelete.mockResolvedValue(mockReservacion);

        const res = await request(app).delete("/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockRowsAffectedReservaciones);
    });

    it("DELETE /:id - Actualiza una reservación por su ID - 500", async () => {
        mockDelete.mockRejectedValue(new Error("Database error"));

        const res = await request(app).delete("/1");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
