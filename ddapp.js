//modules
const express = require('express');
const morgan = require('morgan'); // Request logger
const bodyparser = require('body-parser');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http); // requiring socket


// file
const ddrouter = require('./controller/ddrouter'); // hibiscus unofficial api


//middlewares
app.use(morgan('dev')); // for logging all the requests
// Add headers for CROS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    res.io = io
    next();
});
app.use(bodyparser.json()); //for parsing application/json()
app.use(bodyparser.urlencoded({extended:true})); //for parsing application/x-www-form-urlencoded


// constants
var port = 8082 ; // port to listen


// api routes
ddrouter(app, io); // hibiscus unofficial API





//port to listen
http.listen(port,function () {
    console.log('listening at the port ' + port); // defining the port for listening
});