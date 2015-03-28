// server.js

// modules
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

var port = process.env.PORT || 8080;

var routes = require('./app/routes')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(port);

console.log('Listening on ' + port);
