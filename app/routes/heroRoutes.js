var mongoose = require('mongoose');

module.exports = function(app) {
	app.log('Hero routes loaded');

	app.get('/api/hero/', function (req, res, next) {
		var heroModel = mongoose.model('Hero');
		app.log('Getting all heroes...');
		heroModel.find(function(err, heroes) {
			if (err) {
				next(err);
				return;
			}

			res.json(heroes);
		});
	});

	app.get('/api/hero/:name', function (req, res, next) {
		var heroModel = mongoose.model('Hero');
		var searchName = req.params.name.toLowerCase();

		app.log('Getting specific hero with name: ' + searchName);

		heroModel.findOne({urlName: searchName}, function (err, hero) {
			if (err) {
				next(err);
				return;
			}

			if (hero) {
				app.log('Found ' + hero.name);
			} else {
				app.log("ERR: Couldn't find hero...");
			}

			res.json(hero);
		});
	});
};
