
var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(app) {
	app.log('Counter routes loaded');

	app.get('/api/:type/:id/counter', function (req, res) {
		var counterModel = mongoose.model('Counter');
		var heroModel = mongoose.model('Hero');

		var hero;

		app.log('Getting counters for ' + req.params.type + ' with ID: ' + req.params.id);

		function callback(hero) {
			var heroID = hero._id.toString();

			counterModel.find({ $or: [{ heroID: heroID }, { heroID: hero.urlName }] }, function(err, counters) {
				if (err) {
				       app.log("ERROR: " + err);
				       res.status(500).send(err);
				}

				res.json(counters);
			});
		}

		heroModel.findById(req.params.id, function (err, foundByID) {
			if (err) {
				heroModel.findOne({urlName: req.params.id.toLowerCase()}, function (err, foundByName) {
					if (err) {
						throw err;
					}

					if (foundByName) {
						callback(foundByName);
					} else {
						throw "ERR: Couldn't find hero with urlName of " + req.params.id.toLowerCase();
					}
				});
			} else {
				callback(foundByID);
			}
		});

	});

	app.get('/api/:type/:heroID/counter/:counterID', function (req, res) {
		var counterModel = mongoose.model('Counter');

		app.log('Getting specific counter with ID: ' + req.params.counterID);

		counterModel.findById(req.params.counterID, function (err, counter) {
			if (err) {
			       app.log("ERROR: " + err);
			       res.status(500).send(err);
			}

			res.json(counter);
		});
	});

	app.post('/api/:type/:heroID/counter/', function (req, res) {
		var counterModel = mongoose.model('Counter');

		app.log('Adding ' + req.params.type + ' counter...');

		if (!req.body) {
			throw 'Parser error';
		}

		if (!req.body.details) {
			throw 'Not enough details';
		}

		app.log(JSON.stringify(req.body));

		req.body.patch = app.currentPatch;
		req.body.votes = [];
		req.body.heroID = req.params.heroID;

		if (req.headers['x-forwarded-for']) {
			app.log(req.headers['x-forwarded-for']);
			req.body.source = req.headers['x-forwarded-for'].split(',')[0];
		} else {
			req.body.source = req.connection.remoteAddress;
		}

		counterModel.create(req.body, function (err, post) {
			if (err) {
				app.log("ERROR: " + err);
				res.status(500).send(err);
			}

			res.json(post);
		});
	});

	app.post('/api/:type/:heroID/counter/:counterID', function (req, res) {
		var counterModel = mongoose.model('Counter');
		var modelQuery = { heroID: req.params.heroID, _id: req.params.counterID };

		app.log("Voting...");

		if (!req.body) {
			throw 'Parser error';
		}

		var isUpvote = req.body.isUpvote;
		var source;

		if (req.headers['x-forwarded-for']) {
			source = req.headers['x-forwarded-for'].split(',')[0];
		} else {
			source = req.connection.remoteAddress;
		}

		counterModel.findById(req.params.counterID, function (err, counter) {
			if (err) {
				app.log("ERROR: " + err);
				res.status(500).send(err);
			}

			var existingVote = _.find(counter.votes, function(value, index) { return value.source == source; });


			if (existingVote) {
				existingVote.isUpvote = isUpvote;
				existingVote.patch = app.currentPatch;
			} else {
				counter.votes.push( { isUpvote: isUpvote, source: source, patch: app.currentPatch } );
			}

			counter.save();

			app.log('Successfully ' + (isUpvote ? 'upvoted' : 'downvoted') + ': ' + counter.details);

			res.end();
		});
	});
};
