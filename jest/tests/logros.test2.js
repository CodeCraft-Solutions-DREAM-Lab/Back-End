import request from "supertest";
import app from "../../app.js";

describe("Logros Tests", () => {
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
