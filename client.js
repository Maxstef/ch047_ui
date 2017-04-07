'use strict';
//              CLIENT
var express = require('express'),
    app = express(),
    path = require('path');
app.use(express.static('dist'));

app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.sendFile(path.join('public/index.html'));
});

app.set('port', (process.env.PORT || 5000));

console.log('Client up and running on http://localhost:/' + app.get('port'));
app.listen(app.get('port'));

// //              JSON-SERVER
// var jsonServer = require('json-server'),
//     server = jsonServer.create(),
//     router = jsonServer.router('db.json'),
//     serverPort = 2847;
// server.use(jsonServer.defaults());
//
// server.use(router);
// console.log('Server up and running on http://localhost:/' + serverPort);
// server.listen(serverPort);
