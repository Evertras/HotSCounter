var mongoose = require('mongoose');

module.exports = function(app) {
	app.log('Hero routes loaded');

	app.get('/api/hero/', function (req, res) {
		var heroModel = mongoose.model('Hero');
		app.log('Getting all heroes...');
		heroModel.find(function(err, heroes) {
			if (err) throw err;
			res.json(heroes);
		});
	});

	app.get('/api/hero/:id', function (req, res) {
		var heroModel = mongoose.model('Hero');

		app.log('Getting specific hero with ID: ' + req.params.id);

		heroModel.findById(req.params.id, function (err, hero) {
			if (err) throw err;

			app.log('Found ' + hero.name);

			res.json(hero);
		});
	});
};
