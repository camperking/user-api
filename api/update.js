const { collections } = require('../utils/db');
const { updateSchema } = require('../conf/schemes');
const { getHash } = require('../utils/hash');

exports.update = async (req, res) => {
    const users = collections.users;

    try {
        const update = await updateSchema.validate(req.body);

        const user = users.findOne({ name: update.name });

        if (user !== null) {

            if (update.sessionId === user.sessionId) {

                user.password = getHash(update.password);

                users.update(user);

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