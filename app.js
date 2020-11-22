const polka = require('polka');
const bodyParser = require('body-parser');

const { register } = require('./api/register');
const { login } = require('./api/login');
const { logout } = require('./api/logout');
const { auth } = require('./api/auth');
const { update } = require('./api/update');

const app = polka();


app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.end('200');
})
app.post('/register', register)
app.post('/login', login)
app.post('/logout', logout)
app.post('/auth', auth)
app.post('/update', update);

module.exports = app;

