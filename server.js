// server.js

// modules
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var dbConfig = require('./config/db');

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

app.listen(port);

console.log('Listening on ' + port);
