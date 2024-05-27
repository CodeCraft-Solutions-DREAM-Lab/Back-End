import request from "supertest";
import router from "../../controllers/materiales.js";
import {
    mockError,
    mockMaterialesRequest,
    mockMateriales,
} from "../mockData.js";
import {
    mockDatabase,
    mockExecuteProcedure,
    clearMocks,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Materiales", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("POST / - Obtiene los materiales disponibles dado una sala, fecha, hora de inicio, y duración - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockMateriales);

        const res = await request(app).post("/").send(mockMaterialesRequest);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockMateriales);
    });

    it("POST / - Obtiene los materiales disponibles dado una sala, fecha, hora de inicio, y duración - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).post("/").send({});
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
