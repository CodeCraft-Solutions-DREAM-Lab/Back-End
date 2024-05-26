import request from "supertest";
import router from "../../controllers/videowall.js";
import { mockError, mockReservaciones } from "../mockData.js";
import {
    mockDatabase,
    mockExecuteProcedure,
    clearMocks,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Videowall", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET /reservaciones - Obtener reservaciones para desplegar en el videowall - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockReservaciones);

        const res = await request(app).get("/reservaciones");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockReservaciones);
    });

    it("GET /reservaciones - Obtener reservaciones para desplegar en el videowall - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/reservaciones");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
