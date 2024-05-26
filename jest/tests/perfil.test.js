import request from "supertest";
import router from "../../controllers/perfil.js";
import {
    mockError,
    mockLogrosPerfil,
    mockLogrosPerfilResponse,
    mockConfiguracionLogroPerfil,
    mockConfigurarLogroPerfilRequest,
    mockDatosPerfil,
} from "../mockData.js";
import {
    mockDatabase,
    mockExecuteProcedure,
    clearMocks,
    mockExecuteQuery,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Perfil", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET /logros/:idUsuario - Obtener los logros de un usuario - 200", async () => {
        mockExecuteProcedure
            .mockResolvedValueOnce(mockLogrosPerfil)
            .mockResolvedValueOnce(mockConfiguracionLogroPerfil);

        const res = await request(app).get("/logros/test");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockLogrosPerfilResponse);
    });

    it("GET /logros/:idUsuario - Obtener los logros de un usuario - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/logros/test");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("POST /logros/:idUsuario - Configura el logro y color preferido del usuario - 200", async () => {
        mockExecuteProcedure.mockResolvedValue({});

        const res = await request(app)
            .post("/logros/test")
            .send(mockConfigurarLogroPerfilRequest);
        expect(res.statusCode).toEqual(204);
    });

    it("POST /logros/:idUsuario - Configura el logro y color preferido del usuario - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).post("/logros/test").send({});
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("GET /:idUsuario - Obtiene todos los datos del usuario para su perfil - 200", async () => {
        mockExecuteQuery.mockResolvedValue(mockDatosPerfil);

        const res = await request(app).get("/test");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockDatosPerfil);
    });

    it("GET /:idUsuario - Obtiene todos los datos del usuario para su perfil - 500", async () => {
        mockExecuteQuery.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/test");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
