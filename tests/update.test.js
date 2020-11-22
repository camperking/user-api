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

    const _update = { ...newUser };
    let update = _update;

    beforeAll(async () => {
        const res = await callApi('/register', newUser);
        _update.sessionId = res.sessionId;
    });

    beforeEach(() => {
        update = {...update};
    });

    test('It should update the password and return success', async () => {
        _update.password = 'newPassword';
        const res = await callApi('/update', _update);

        expect(res.success).toBe(true);
    });

    test('It should return an error if sessionId is wrong', async () => {
        update.sessionId = 'asdasdasd';

        const res = await callApi('/update', update);

        expect(res.error).toBeDefined();
    });

    test('It should return an error if name is wrong', async () => {
        update.name = 'asdasd';

        const res = await callApi('/update', update);

        expect(res.error).toBeDefined();
    });

});