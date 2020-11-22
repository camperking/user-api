const { dbInit, dbTestReset } = require('../utils/db');
const { callApi } = require('./_callApi');

process.env.NODE_ENV = 'testing';

const newUserTemplate = {
    name: 'newUserTest',
    password: 'asdasd',
    email: 'asd@asd.net'
};

beforeAll(() => {
        return dbInit();
});

afterAll(() => {
    return dbTestReset();
});

describe('/register POST', () => {
    const newUser = { ...newUserTemplate };

    test('It should create and return a new user object', async () => {
        const res = await callApi('/register', newUser);

        expect(res.name).toBe(newUser.name);
        expect(res.sessionId).toBeDefined();
    });

    test('It should return an error if username is already used', async () => {
        const res = await callApi('/register', newUser);

        expect(res.error).toBeDefined();
    });
});

describe('/register POST Validation', () => {
    const newUser = { ...newUserTemplate };

    test('It should return an error if username has bad chars', async () => {
        newUser.name = 'bad##userna%$+me';

        const res = await callApi('/register', newUser);

        expect(res.error).toBeDefined();
    });

    test('It should return an error if username is too short', async () => {
        newUser.name = 'asd';

        const res = await callApi('/register', newUser);

        expect(res.error).toBeDefined();
    });

    test('It should return an error if username is too long', async () => {
        newUser.name = '01234567890123456789012345';

        const res = await callApi('/register', newUser);

        expect(res.error).toBeDefined();
    });

    test('It should return an error if email is bad', async () => {
        newUser.email = 'email_at_bad.com';

        const res = await callApi('/register', newUser);

        expect(res.error).toBeDefined();
    });

});