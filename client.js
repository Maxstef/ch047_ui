'use strict';

var express = require('express'),
  app = express(),
  path = require('path');


app.set('port', (process.env.PORT || 3009));

app.use(express.static(__dirname + '/dist'));

// views is directory for all template files
app.set('views', __dirname + '/app');
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/set-value', function(request, response) {
  response.render('pages/index');
});

app.get('/tariff-calculate', function(request, response) {
  response.render('pages/index');
});

app.get('/history', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
