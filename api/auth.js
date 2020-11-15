const { collections } = require('../utils/db');
const { authSchema } = require('../conf/schemes');
const { getHash } = require('../utils/hash');

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