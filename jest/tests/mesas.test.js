import request from "supertest";
import router from "../../controllers/mesas.js";
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
    mockCuposMesa,
    mockCuposMesaResponse,
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

describe("Mesas", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET / - Obtiene todas las mesas - 200", async () => {
        mockReadAll.mockResolvedValue(mockMesas);

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockMesas);
    });

    it("GET / - Obtiene todas las mesas - 500", async () => {
        mockReadAll.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /:idSala - Obtiene todas las mesas - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockCuposMesa);

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockCuposMesaResponse);
    });

    it("GET /:idSala - Obtiene todas las mesas - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
