
var mongoose = require('mongoose');

module.exports = function(app) {
	console.log('Counter routes loaded');

	app.get('/api/hero/:id/counter', function (req, res) {
		var counterModel = mongoose.model('Counter');

		console.log('Getting counters for hero with ID: ' + req.params.id);

		counterModel.find({ heroID: req.params.id }, function(err, counters) {
			if (err) throw err;

			res.json(counters);
		});
	});

	app.get('/api/hero/:heroID/counter/:counterID', function (req, res) {
		var counterModel = mongoose.model('Counter');

		console.log('Getting specific counter with ID: ' + req.params.counterID);

		counterModel.findById(req.params.counterID, function (err, counter) {
			if (err) throw err;

			res.json(counter);
		});
	});

	app.post('/api/hero/:heroID/counter/', function (req, res) {
		var counterModel = mongoose.model('Counter');

		console.log('Adding counter...');
		console.log(req.body);

		if (!req.body) {
			throw 'Parser error';
		}

		if (!req.body.details) {
			throw 'Not enough details';
		}

		req.body.patch = app.currentPatch;
		req.body.votes = [];
		req.body.heroID = req.params.heroID;

		if (req.header['x-forwarded-for']) {
			req.body.source = req.header['x-forwarded-for'].split(',')[0];
		} else {
			req.body.source = req.connection.remoteAddress;
		}

		counterModel.create(req.body, function (err, post) {
			if (err) throw err;

			res.json(post);
		});
	});
};
