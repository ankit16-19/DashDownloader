const request = require('request');
const downloaer = require('./downloader');


module.exports = function (app, io) {

//    api html
    app.get('/',function (req, res) {
        res.sendFile(__dirname + '/index.html');

    });
    app.get('/down',function (req, res) {
        downloaer("hello", io, function (data) {
            res.send(data);
        })
    });
    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};