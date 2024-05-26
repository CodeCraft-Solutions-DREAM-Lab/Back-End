import request from "supertest";
import router from "../../controllers/usuarios.js";
import {
    mockError,
    mockReservacionesByMes,
    mockReservacionesBySalaByMes,
    mockSalasDisponibles,
    mockUsoMaterialByMes,
    mockPenalizacionesByMes,
    mockUsuarios,
    mockUsuario,
    mockRowsAffectedUsuarios,
    mockUsuarioPrioridad,
    mockMessageResponse,
} from "../mockData.js";
import {
    mockDatabase,
    mockExecuteProcedure,
    clearMocks,
    mockReadAll,
    mockUpdate,
} from "../mockDatabase.js";
import server from "../mockServer.js";

const app = server(router, mockDatabase);

describe("Usuarios", () => {
    beforeEach(() => {
        clearMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("GET / - Obtiene todos los usuarios - 200", async () => {
        mockReadAll.mockResolvedValue(mockUsuarios);

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUsuarios);
    });

    it("GET / - Obtiene todos los usuarios - 500", async () => {
        mockReadAll.mockRejectedValue(new Error("Database error"));

        const res = await request(app).get("/");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    it("PUT /:idUsuario - Actualiza un usuario por id - 200", async () => {
        mockUpdate.mockResolvedValue(mockUsuario);

        const res = await request(app).put("/test");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockRowsAffectedUsuarios);
    });

    it("PUT /:idUsuario - Actualiza un usuario por id - 500", async () => {
        mockUpdate.mockRejectedValue(new Error("Database error"));

        const res = await request(app).put("/test");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });

    /* NO SE MUY BIEN COMO HACER LA PRUEBA CON LO DEL CORREO */
    it.skip("POST /cambiarPrioridad - Actualiza un usuario por id - 200", async () => {
        mockExecuteProcedure.mockResolvedValue(mockUsuario);

        const res = await request(app)
            .post("/cambiarPrioridad")
            .send(mockUsuarioPrioridad);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockMessageResponse);
    });

    /* NO SE MUY BIEN COMO HACER LA PRUEBA CON LO DEL CORREO */
    it.skip("POST /cambiarPrioridad - Actualiza un usuario por id - 500", async () => {
        mockExecuteProcedure.mockRejectedValue(new Error("Database error"));

        const res = await request(app).post("/cambiarPrioridad").send({});
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(mockError);
    });
});
