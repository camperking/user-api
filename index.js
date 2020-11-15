const polka = require('polka');
const { PORT } = require('./config');
const { dbInit } = require('./db');
var bodyParser = require('body-parser');

const { register } = require('./api/register');

dbInit().then(() => {
    polka()
    .use(bodyParser.json())
    .get('/', (req, res) => {
        res.end('200');
    })
    .post('/register', register)
    .listen(PORT, err => {
        if (err) throw err;
        console.log('Running on http://localhost:3000');
    });
});