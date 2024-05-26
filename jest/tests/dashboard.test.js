import request from "supertest";
import router from "../../controllers/dashboard.js";
import {
    mockError,
    mockReservacionesByMes,
    mockReservacionesBySalaByMes,
    mockSalasDisponibles,
    mockUsoMaterialByMes,
    mockPenalizacionesByMes,
} from "../mockData.js";
import {
    mockDatabase,
    mockExecuteProcedure,
    clearMocks,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Dashboard", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET /reservacionesByMes - Obtiene las reservaciones por mes - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockReservacionesByMes);

        const res = await request(app).get("/reservacionesByMes");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockReservacionesByMes);
    });

    it("GET /reservacionesByMes - Obtiene las reservaciones por mes - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/reservacionesByMes");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /reservacionesBySalaByMes - Obtiene las reservaciones por sala por mes - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockReservacionesBySalaByMes);

        const res = await request(app).get("/reservacionesBySalaByMes");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockReservacionesBySalaByMes);
    });

    it("GET /reservacionesBySalaByMes - Obtiene las reservaciones por sala por mes - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/reservacionesBySalaByMes");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /salasDisponibles - Obtiene las salas disponibles - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockSalasDisponibles);

        const res = await request(app).get("/salasDisponibles");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockSalasDisponibles);
    });

    it("GET /salasDisponibles - Obtiene las salas disponibles - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/salasDisponibles");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /usoMaterialByMes - Obtiene el uso de material por mes - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockUsoMaterialByMes);

        const res = await request(app).get("/usoMaterialByMes");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUsoMaterialByMes);
    });

    it("GET /usoMaterialByMes - Obtiene el uso de material por mes - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/usoMaterialByMes");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /penalizacionesByMes - Obtiene las penalizaciones por mes - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockPenalizacionesByMes);

        const res = await request(app).get("/penalizacionesByMes");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockPenalizacionesByMes);
    });

    it("GET /penalizacionesByMes - Obtiene las penalizaciones por mes - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/penalizacionesByMes");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
