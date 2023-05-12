const initData = require("./data/initData")
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');
// var env = require('dotenv').load();
const port = process.env.PORT || 8080;

// models
let models = require("./models");

// routes
let users = require('./routes/users');
let roles = require('./routes/roles');
let privileges = require('./routes/privileges');
//Sync Database
models.sequelize.sync({force: true}).then(async function () {
    await initData()

    console.log('connected to database')
}).catch(function (err) {
    console.log(err)
});

app.use(cors({
        origin: '*'
    }
))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// register routes
app.use('/users', users);
app.use('/roles', roles);
app.use('/privileges', privileges);

// index path
app.get('/', function (req, res) {
    console.log('app listening on port: ' + port);
    res.send('Welcome to SQLite Express')
});

app.listen(port, function () {
    console.log('app listening on port: ' + port);
});

module.exports = app;