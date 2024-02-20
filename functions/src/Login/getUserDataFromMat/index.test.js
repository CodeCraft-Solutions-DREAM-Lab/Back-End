const { getUserDataFromMat } = require('./index');

const test = require('firebase-functions-test')();

test.mockConfig({/* your mock config */});
describe('testing getUserDataFromMat:', () => {
    it('Probando matrícula de Jaime (A00833173)', async () => {
        const wrapped = test.wrap(getUserDataFromMat);
        const data = { mat:"A00833173" };
        const context = {/* your test context */};
        const resp = await wrapped(data, context);

        expect(resp).toEqual({
            error: false, 
            data: {
                lastName: "López Castro",
                major: "ITC",
                mat: "A00833173",
                name: "Jaime Eduardo",
                semester: 6,
            }
        });
    }, 10000 /*optional timeout (ms)*/);
});
afterAll(() => {
    test.cleanup();
});
