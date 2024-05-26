import request from "supertest";
import router from "../../controllers/experiencias.js";
import {
    mockExperiencia,
    mockExperiencias,
    mockGrupos,
    mockError,
} from "../mockData.js";
import {
    mockDatabase,
    mockReadAll,
    mockExecuteProcedure,
    clearMocks,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Experiencias", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET / - Obtiene todas las experiencias - 200", async () => {
        mockReadAll.mockResolvedValue(mockExperiencias);

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });

    it("GET / - Obtiene todas las experiencias - 500", async () => {
        mockReadAll.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /autodirigidas - Obtiene todas las experiencias autodirigidas - 200", async () => {
        mockReadAll.mockResolvedValue(mockExperiencias);

        const res = await request(app).get("/autodirigidas");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });

    it("GET /autodirigidas - Obtiene todas las experiencias autodirigidas - 500", async () => {
        mockReadAll.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/autodirigidas");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /:id - Obtiene una experiencia por su ID - 200", async () => {
        mockExecuteProcedure.mockResolvedValue([mockExperiencia]);

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([mockExperiencia]);
    });

    it("GET /:id - Obtiene una experiencia por su ID - 404", async () => {
        mockExecuteProcedure.mockResolvedValue([]);

        const res = await request(app).get("/2");
        expect(res.statusCode).toEqual(404);
    });

    it("GET /:id - Obtiene una experiencia por su ID - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("POST /UFs - Obtiene las experiencias de las UFs de un usuario - 200", async () => {
        mockReadAll
            .mockResolvedValueOnce(mockGrupos)
            .mockResolvedValueOnce(mockExperiencias);

        const res = await request(app).post("/UFs").send({ user: "test" });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });

    it("POST /UFs - Obtiene las experiencias de las UFs de un usuario - 500", async () => {
        mockReadAll.mockRejectedValue(new Error("Database error"));

        const res = await request(app).post("/UFs").send({ user: "test" });
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
