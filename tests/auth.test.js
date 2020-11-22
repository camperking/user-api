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

describe('/auth POST', () => {
    const auth = {
        name: newUser.name,
        sessionId: ''
    };

    beforeAll(async () => {
        const res = await callApi('/register', newUser);

        auth.sessionId = res.sessionId;
    });

    test('It should authenticate the user and return success', async () => {
        const res = await callApi('/auth', auth);

        expect(res.success).toBe(true);
    });

    test('It should return an error if sessionId is wrong', async () => {
        const _auth = {...auth};
        _auth.sessionId = 'asdasdasd';

        const res = await callApi('/auth', _auth);

        expect(res.error).toBeDefined();
    });

    test('It should return an error if name is wrong', async () => {
        const _auth = {...auth};
        _auth.name = 'asdasd';

        const res = await callApi('/auth', _auth);

        expect(res.error).toBeDefined();
    });

});