const app = require('./app');
const { PORT } = require('./conf/config');
const { dbInit } = require('./utils/db');

dbInit().then(() => {
    app.listen(PORT, err => {
        if (err) throw err;
        console.log('Running on http://localhost:3000');
    });
});