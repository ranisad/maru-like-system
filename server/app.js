const express = require('express');
const app = express();
global.config = require('./config.js');
const mysqlConnection = require('./coreDAL/index').MySqlConnection;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
mysqlConnection.initialize();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', require('./controller/'));

// Handle 404
app.use(function (req, res) {
    if (req.xhr) {
        res.status(404).json('404: Page not Found');
    } else {
        res.status(404).send('404: Page not Found');
    }
});

// Handle 500
app.use(function (error, req, res, next) {
    console.log(error)
    if (req.xhr) {
        res.status(500).json('500: Internal Server Error' + error);
    } else {
        res.status(500).send('500: Internal Server Error' + error);
    }
    next();
});

process.on('uncaughtException', function (err) {
    console.log(err);
})

app.listen(process.env.PORT || 3000, function () {
    console.log('battle app running on port 3000');
});
