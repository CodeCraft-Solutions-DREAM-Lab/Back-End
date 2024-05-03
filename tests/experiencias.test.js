const request = require("supertest");
const app = require("../index");

describe("Experiencias Tests", () => {
    let server;

    beforeAll(() => {
        server = app.listen();
    });

    afterAll(() => {
        return server.close();
    });

    it("GET /experiencias", async () => {
        const res = await request(app).get("/experiencias");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idExperiencia: expect.any(Number),
                    idUF: expect.any(Number),
                    idSala: expect.any(Number),
                    nombre: expect.any(String),
                    descripcion: expect.any(String),
                    esAutoDirigida: expect.any(Boolean),
                    esExclusivaUF: expect.any(Boolean),
                    portadaURL: expect.any(String),
                    fechaInicio: expect.any(String),
                    fechaFin: expect.any(String),
                    horaFin: expect.any(String),
                }),
            ])
        );
    });

    it("GET /experiencias/autodirigidas", async () => {
        const res = await request(app).get("/experiencias/autodirigidas");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idExperiencia: expect.any(Number),
                    idUF: expect.any(Number),
                    idSala: expect.any(Number),
                    nombre: expect.any(String),
                    descripcion: expect.any(String),
                    esAutoDirigida: true,
                    esExclusivaUF: expect.any(Boolean),
                    portadaURL: expect.any(String),
                    fechaInicio: expect.any(String),
                    fechaFin: expect.any(String),
                    horaFin: expect.any(String),
                }),
            ])
        );
    });

    it("GET /experiencias/:id", async () => {
        const id = 1;
        const res = await request(app).get(`/experiencias/${id}`);
        expect(res.statusCode).toEqual(200);
        res.body.forEach((item) => {
            expect(item).toMatchObject({
                idExperiencia: expect.any(Number),
                idUF: null,
                idSala: expect.any(Number),
                nombre: expect.any(String),
                descripcion: expect.any(String),
                esAutoDirigida: expect.any(Boolean),
                esExclusivaUF: expect.any(Boolean),
                portadaURL: expect.any(String),
                fechaInicio: expect.any(String),
                fechaFin: expect.any(String),
                horaFin: expect.any(String),
            });
        });
    });

    it("POST /experiencias/UFs", async () => {
        const user = "test";
        const res = await request(app).post("/experiencias/UFs").send({ user });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    idExperiencia: expect.any(Number),
                    idUF: expect.any(Number),
                    idSala: expect.any(Number),
                    nombre: expect.any(String),
                    descripcion: expect.any(String),
                    esAutoDirigida: expect.any(Boolean),
                    esExclusivaUF: expect.any(Boolean),
                    portadaURL: expect.any(String),
                    fechaInicio: expect.any(String),
                    fechaFin: expect.any(String),
                    horaFin: expect.any(String),
                }),
            ])
        );
    });
});
