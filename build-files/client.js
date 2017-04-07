'use strict';
//              CLIENT
var express = require('express'),
    app = express(),
    path = require('path'),
    projectRoot = __dirname + '/dist/';
app.use(express.static(projectRoot));

app.get('*', function (req, res) {
    res.sendFile(path.join(projectRoot + '/index.html'));
});

var port = 3009;

console.log('Client up and running on http://localhost:/' + port);
app.listen(port);

//              JSON-SERVER
var jsonServer = require('json-server'),
    server = jsonServer.create(),
    router = jsonServer.router('db.json'),
    serverPort = 2847;
server.use(jsonServer.defaults());

server.use(router);
console.log('Server up and running on http://localhost:/' + serverPort);
server.listen(serverPort);
