const { collections } = require('../utils/db');
const { registerSchema } = require('../conf/schemes');
const { getHash } = require('../utils/hash');


exports.register = async (req, res) => {
    const users = collections.users;

    try {

        const newUser = await registerSchema.validate(req.body);

        const user = users.findOne({ name: newUser.name});

        if (user === null) {

            newUser.registered = new Date();

            newUser.password = getHash(newUser.password);

            const sessionId = getHash(newUser.name + new Date() + Math.random()); 
            
            newUser.sessionId = sessionId;

            users.insert(newUser);

            const registeredUser = {
                name: newUser.name,
                sessionId
            }

            res.end(JSON.stringify(registeredUser));
        } else {
            res.end('{ "error": "user exists" }');
        }

    } catch (err) {
        res.end(`{ "error": "${err.errors[0]}"}`);
    }
}