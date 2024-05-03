const request = require("supertest");
const app = require("../index");

describe("Logros Tests", () => {
    let server;

    beforeAll(() => {
        server = app.listen();
    });

    afterAll(() => {
        return server.close();
    });

    it("PUT /logros/:idUsuario/:idLogro", async () => {
        const idUsuario = 1;
        const idLogro = 1;
        const valor = {
            idLogro: 1,
            valorActual: 10,
            obtenido: true,
        };
        const res = await request(app)
            .put(`/logros/${idUsuario}/${idLogro}`)
            .send(valor);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                rowsAffected: expect.any(Number),
            })
        );
    });
});
