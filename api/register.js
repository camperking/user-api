const { collections } = require('../db');
const { registerSchema } = require('../schemes');
const { getHash } = require('../hash');


exports.register = async (req, res) => {
    const users = collections.users;

    try {

        const newUser = await registerSchema.validate(req.body);

        const user = users.findOne({ name: newUser.name});

        if (user === null) {

            newUser.registered = new Date();

            newUser.password = getHash(newUser.password);

            newUser.sessionId = getHash(newUser.name + new Date() + Math.random());

            const registeredUser = users.insert(newUser);

            let response = {...registeredUser};

            delete response.password;
            delete response.registered;
            delete response.meta;
            delete response['$loki'];

            res.end(JSON.stringify(response));
        } else {
            res.end('{ "error": "user exists" }');
        }

    } catch (err) {
        res.end(`{ "error": "${err.errors[0]}"}`);
    }
}