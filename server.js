// server.js

// modules
var express = require('express');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

var routes = require('./app/routes')(app);
var models = require('./app/models')(app);
var heroInit = require('./app/init/heroInit');

mongoose.connect('mongodb://localhost/hotscomp', function(err) {
		if (err) { 
			console.log('DB connection ERROR: ', err);
		} else {
			console.log('DB connection success!');
		}
});

(new heroInit).initializeHeroes();

app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/css', express.static(path.resolve(__dirname, 'public', 'css')));
app.use('/js', express.static(path.resolve(__dirname, 'public', 'js')));
app.use('/libs', express.static(path.resolve(__dirname, 'public', 'libs')));
app.use('/', express.static(path.resolve(__dirname, 'public', 'views')));

//app.get('*', function(req, res) {
//	res.sendFile(__dirname + '/public/views/index.html');
//});

app.listen(port);

console.log('Listening on ' + port);
