// server.js

var config = require('./app/config.json')[process.env.NODE_ENV || 'prod'];

// modules
var express = require('express');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.currentPatch = "Sylvanas";

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.log = function(msg) {
	var prefix = '[' + (new Date()).toISOString() + '] - ';

	console.log(prefix + msg);
};

var routes = require('./app/routes')(app);
var models = require('./app/models')(app);
var heroInit = require('./app/init/heroInit');

mongoose.connect(config.MONGO_URI, function(err) {
	if (err) { 
		app.log('DB connection ERROR: ', err);
	} else {
		app.log('DB connection success!  Using ' + config.MONGO_URI);
	}

	mongoose.connection.on('error', function (err) {
		app.log('!!!!DB ERROR: ' + err);
	}
});

(new heroInit(app)).initializeHeroes();

function errorHandler(err, req, res, next) {
	app.log("UNHANDLED ERROR: " + err);

	res.status(500).send({ error: err });
}

app.use(errorHandler);

app.use('/css', express.static(path.resolve(__dirname, 'public', 'css')));
app.use('/img', express.static(path.resolve(__dirname, 'public', 'img')));
app.use('/js', express.static(path.resolve(__dirname, 'public', 'js')));
app.use('/libs', express.static(path.resolve(__dirname, 'public', 'libs')));
app.use('/', express.static(path.resolve(__dirname, 'public', 'views')));

//app.get('*', function(req, res) {
//	res.sendFile(__dirname + '/public/views/index.html');
//});

app.listen(port);

app.log('Listening on ' + port);
