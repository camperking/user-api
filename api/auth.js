const { collections } = require('../db');
const { authSchema } = require('../schemes');
const { getHash } = require('../hash');

exports.auth = async (req, res) => {
    const users = collections.users;

    try {
        const auth = await authSchema.validate(req.body);

        const user = users.findOne({ name: auth.name });

        if (user !== null) {

            if (auth.sessionId === user.sessionId) {
                res.end('{ "success": true }');
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