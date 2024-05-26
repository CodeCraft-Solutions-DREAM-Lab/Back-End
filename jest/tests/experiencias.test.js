import request from "supertest";
import router from "../../controllers/experiencias.js";
import { mockExperiencia, mockExperiencias, mockGrupos } from "../mockData.js";
import {
    mockDatabase,
    mockReadAll,
    mockExecuteProcedure,
    clearMocks,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Experiencias API", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET / - fetch all experiencias", async () => {
        mockReadAll.mockResolvedValue(mockExperiencias);

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });

    it("GET /autodirigidas - fetch all autodirigidas experiencias", async () => {
        mockReadAll.mockResolvedValue(mockExperiencias);

        const res = await request(app).get("/autodirigidas");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });

    it("GET /:id - fetch experiencia by id", async () => {
        mockExecuteProcedure.mockResolvedValue([mockExperiencia]);

        const res = await request(app).get("/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([mockExperiencia]);
    });

    it("POST /UFs - fetch experiencias by user", async () => {
        mockReadAll
            .mockResolvedValueOnce(mockGrupos)
            .mockResolvedValueOnce(mockExperiencias);

        const res = await request(app).post("/UFs").send({ user: "test" });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockExperiencias);
    });
});
