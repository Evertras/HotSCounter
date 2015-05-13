var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(app) {
	app.get('/api/counter/total', function (req, res) {
		var counterModel = mongoose.model('Counter');

		counterModel.count({}, function(err, c) {
			if (err) {
				app.log("ERROR: " + err);
				res.status(500).send(err);
			}

			res.json( { total: c } );
		});
	});

	app.get('/api/counter/totalvotes', function (req, res) {
		var counterModel = mongoose.model('Counter');

		counterModel.find({}, function(err, counters) {
			if (err) {
				app.log("ERROR: " + err);
				res.status(500).send(err);
			}

			res.json( {
				total: counters.map(function (counter) { return counter.votes.length; }).reduce(function(prev, res) { return prev + res; }, 0)
			});
		});
	});


	app.get('/api/counter/newest/:num', function (req, res) {
		var counterModel = mongoose.model('Counter');
		var numRecordsParsed = parseInt(req.params.num, 10);
		var numRecords = 10;
		var maxRecords = 50;

		if (numRecordsParsed && numRecordsParsed >= 1 && numRecordsParsed <= maxRecords) {
			numRecords = numRecordsParsed;
		}

		counterModel
			.find()
			.sort( { '_id' : -1 })
			.limit(numRecords)
			.exec(function(err, counters) {
				if (err) {
					app.log("ERROR: " + err);
					res.status(500).send(err);
				}

				res.json(counters);
			});
	});

	app.get('/api/:type/:id/counter', function (req, res, next) {
		var counterModel = mongoose.model('Counter');
		var heroModel = mongoose.model('Hero');
		var mapModel = mongoose.model('Map');

		app.log('Getting counters for ' + req.params.type + ' with ID: ' + req.params.id);

		function heroCallback(hero) {
			var heroID = hero._id.toString();

			counterModel.find({ $or: [{ heroID: heroID }, { heroID: hero.urlName }] }, function(err, counters) {
				if (err) {
				       app.log("ERROR: " + err);
				       res.status(500).send(err);
				}

				res.json(counters);
			});
		}

		function mapCallback(map) {
			var mapID = map._id.toString();

			counterModel.find({ $or: [{ heroID: mapID }, { heroID: map.urlName }] }, function(err, counters) {
				if (err) {
				       app.log("ERROR: " + err);
				       res.status(500).send(err);
				}

				res.json(counters);
			});
		}

		if (req.params.type === 'map') {
			mapModel.findById(req.params.id, function (err, foundByID) {
				if (err || !foundByID) {
					mapModel.findOne({urlName: req.params.id.toLowerCase()}, function (err, foundByName) {
						if (err) {
							next(err);
							return;
						}

						if (foundByName) {
							mapCallback(foundByName);
						} else {
							next("ERR: Couldn't find map with urlName of " + req.params.id.toLowerCase());
						}
					});
				} else {
					mapCallback(foundByID);
				}
			});
		}
		else {
			heroModel.findById(req.params.id, function (err, foundByID) {
				if (err || !foundByID) {
					heroModel.findOne({urlName: req.params.id.toLowerCase()}, function (err, foundByName) {
						if (err) {
							next(err);
							return;
						}

						if (foundByName) {
							heroCallback(foundByName);
						} else {
							next("ERR: Couldn't find hero with urlName of " + req.params.id.toLowerCase());
							return;
						}
					});
				} else {
					heroCallback(foundByID);
				}
			});
		}
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

	app.post('/api/:type/:heroID/counter/', function (req, res, next) {
		var counterModel = mongoose.model('Counter');

		app.log('Adding ' + req.params.type + ' counter...');

		if (!req.body) {
			next('Parser error');
			return;
		}

		if (!req.body.details) {
			next('Not enough details');
			return;
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

	app.post('/api/counter/:counterID/comment/', function (req, res, next) {
		var counterModel = mongoose.model('Counter');

		app.log("Adding comment...");

		if (!req.body) {
			next('Parser error');
			return;
		}

		var source;

		if (req.headers['x-forwarded-for']) {
			source = req.headers['x-forwarded-for'].split(',')[0];
		} else {
			source = req.connection.remoteAddress;
		}

		app.log(JSON.stringify(req.body));

		counterModel.findById(req.params.counterID, function (err, counter) {
			if (err) {
				app.log("ERROR: " + err);
				res.status(500).send(err);
			}

			req.body.patch = app.currentPatch;
			req.body.votes = [];
			req.body.counterID = req.params.counterID;

			counter.comments.push(req.body);
			
			counter.save();

			res.end();
		});
	});

	app.post('/api/:type/:heroID/counter/:counterID', function (req, res, next) {
		var counterModel = mongoose.model('Counter');

		app.log("Voting...");

		if (!req.body) {
			next('Parser error');
			return;
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

			var existingVote = _.find(counter.votes, function(value) { return value.source === source; });


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

	app.get('/api/counter/:counterID', function (req, res) {
		var counterModel = mongoose.model('Counter');

		counterModel.findById(req.params.counterID, function (err, counter) {
			if (err) {
				app.log("ERROR: " + err);
				res.status(500).send(err);
			}

			res.json(counter);
		});
	});

	app.log('Counter routes loaded');
};
