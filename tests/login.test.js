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

describe('/login POST', () => {
    const _login = {
        name: newUser.name,
        password: newUser.password
    }
    let login;
    
    beforeAll(async () => {
            const res = await callApi('/register', newUser);

            const logout = {
                name: newUser.name,
                sessionId: res.sessionId
            };

            await callApi('/logout', logout);        
    });

    beforeEach(() => {
        login = {..._login};
    });

    test('It should login the user and return a sessionId', async () => {
        const res = await callApi('/login', login);

        expect(res.sessionId).toBeDefined();
    });

    test('It should return an error if password is wrong', async () => {
        login.password = '123456';
        const res = await callApi('/login', login);

        expect(res.error).toBeDefined();
    })

    test('It should return an error if username is wrong', async () => {
        login.name = '123456';
        const res = await callApi('/login', login);

        expect(res.error).toBeDefined();
    })
});