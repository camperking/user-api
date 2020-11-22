const { dbInit, dbTestReset } = require('../utils/db');
const { callApi } = require('./_callApi');

process.env.NODE_ENV = 'testing';

const newUser = {
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

describe('/logout POST', () => {
    const _logout = {
        name: newUser.name,
        sessionId: ''
    };
    let logout = _logout;

    beforeAll(async () => {
        await callApi('/register', newUser);
    });

    beforeEach(async  () => {
        const login = {
            name: newUser.name,
            password: newUser.password
        };
        const res = await callApi('/login', login);
        logout = {..._logout};
        logout.sessionId = res.sessionId;
    });

    test('It should logout the user and return success', async () => {
        const res = await callApi('/logout', logout);

        expect(res.success).toBe(true);
    });

    test('It should return an error if sessionId is wrong', async () => {
        logout.sessionId = 'asdasdasd';

        const res = await callApi('/logout', logout);

        expect(res.error).toBeDefined();
    });

    test('It should return an error if name is wrong', async () => {
        logout.name = 'asdasd';

        const res = await callApi('/logout', logout);

        expect(res.error).toBeDefined();
    });


});