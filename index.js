const polka = require('polka');
const { PORT } = require('./conf/config');
const { dbInit } = require('./utils/db');
var bodyParser = require('body-parser');

const { register } = require('./api/register');
const { login } = require('./api/login');
const { logout } = require('./api/logout');
const { auth } = require('./api/auth');

dbInit().then(() => {
    polka()
    .use(bodyParser.json())
    .get('/', (req, res) => {
        res.end('200');
    })
    .post('/register', register)
    .post('/login', login)
    .post('/logout', logout)
    .post('/auth', auth)
    .listen(PORT, err => {
        if (err) throw err;
        console.log('Running on http://localhost:3000');
    });
});