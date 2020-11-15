const { collections } = require('../db');
const { loginSchema } = require('../schemes');
const { getHash } = require('../hash');


exports.login = async (req, res) => {
    const users = collections.users;

    try {
        const login = await loginSchema.validate(req.body);

        const user = users.findOne({ name: login.name });

        if (user !== null) {
            if (user.password === getHash(login.password)) {

                const sessionId = getHash(user.name + new Date + Math.random())

                user.sessionId = sessionId;

                users.update(user);

                const response = {
                    name: user.name,
                    sessionId
                };

                res.end(JSON.stringify(response));

            } else {
                res.end('{ "error": "no access" }');
            }
        } else {
            res.end('{ "error": "no user" }');
        }

    } catch (err) {
        res.end(`{ "error": "${err.errors[0]}"}`);
    }
}