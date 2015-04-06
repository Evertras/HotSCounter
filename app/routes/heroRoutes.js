var mongoose = require('mongoose');

module.exports = function(app) {
	app.log('Hero routes loaded');

	app.get('/api/hero/', function (req, res) {
		var heroModel = mongoose.model('Hero');
		app.log('Getting all heroes...');
		heroModel.find(function(err, heroes) {
			if (err) {
				throw err;
			}

			res.json(heroes);
		});
	});

	app.get('/api/hero/:name', function (req, res) {
		var heroModel = mongoose.model('Hero');

		// From a redirect from heroescounters.com
		if (req.params.name.toLowerCase() === 'lostvikings') {
			req.params.name = 'thelostvikings';
		}

		var searchName = req.params.name.toLowerCase();

		app.log('Getting specific hero with name: ' + searchName);

		heroModel.findOne({urlName: searchName}, function (err, hero) {
			if (err) {
				throw err;
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
