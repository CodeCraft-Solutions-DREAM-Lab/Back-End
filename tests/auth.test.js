import request from "supertest";
import app from "../app.js";

describe("Auth Tests", () => {
    it("POST auth/usuario/", async () => {
        const res = await request(app).post("/auth/usuario").send({
            usuario: "A01177767",
            contrasena: "dreamlab",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.jwt).not.toBeNull();
    });

    it("POST auth/token/", async () => {
        const res = await request(app).post("/auth/token").send({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYTAxMTc3NzY3IiwiaWF0IjoxNzE1NzUzNzQzfQ.ml-vMvWq5X8_FdILT9YIPv0oPc9Wlvj3f_N4VhHCAZA",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                isAuth: expect.any(Boolean),
                token_data: expect.objectContaining({
                    usuario: expect.any(String),
                    iat: expect.any(Number),
                }),
            })
        );
    });
});
