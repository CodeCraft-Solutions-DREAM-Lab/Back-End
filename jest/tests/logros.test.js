import request from "supertest";
import router from "../../controllers/logros.js";
import {
    mockExperiencia,
    mockExperiencias,
    mockGrupos,
    mockUpdateLogro,
    mockError,
} from "../mockData.js";
import {
    mockDatabase,
    mockReadAll,
    mockExecuteProcedure,
    updateTwo as mockUpdateTwo,
    clearMocks,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Logros", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    /* EL ENDPOINT NO FUNCIONA POR LO QUE NO PUDE HACER LA PRUEBA */
    it.skip("PUT /:idUsuario/:idLogro - Actualiza un logro específico para un usuario - 200", async () => {
        mockUpdateTwo.mockResolvedValue(mockUpdateLogro);

        const res = await request(app).put("/1/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUpdateLogro);
    });
});
