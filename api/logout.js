const { collections } = require('../utils/db');
const { logoutSchema } = require('../conf/schemes');

exports.logout = async (req, res) => {
    const users = collections.users;

    try {
        const logout = await logoutSchema.validate(req.body);

        const user = users.findOne({ name: logout.name });

        if (user !== null) {
            if (logout.sessionId === user.sessionId) {

                user.sessionId = null;
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