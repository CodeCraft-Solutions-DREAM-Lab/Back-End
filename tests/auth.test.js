const request = require("supertest");
const app = require("../index");

describe("Auth Tests", () => {
    afterAll(async () => {
        await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
    });

    it("POST auth/usuario/", async () => {
        const res = await request(app).post("/auth/usuario").send({
            usuario: "test",
            contrasena: "test",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.jwt).not.toBeNull();
    });

    it("POST auth/token/", async () => {
        const res = await request(app).post("/auth/token").send({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiQTAxMTc3NzY3IiwiaWF0IjoxNzEyNjMzMjU2fQ.-ky8LBLfLFCRmENvP0QetksCFuN9D5R0OGC9NiN2WD0",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(true);
    });
});
