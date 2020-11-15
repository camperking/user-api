const polka = require('polka');
const { PORT } = require('./config');
const { dbInit } = require('./db');
var bodyParser = require('body-parser');

const { register } = require('./api/register');
const { login } = require('./api/login');
const { logout } = require('./api/logout');

dbInit().then(() => {
    polka()
    .use(bodyParser.json())
    .get('/', (req, res) => {
        res.end('200');
    })
    .post('/register', register)
    .post('/login', login)
    .post('/logout', logout)
    .listen(PORT, err => {
        if (err) throw err;
        console.log('Running on http://localhost:3000');
    });
});