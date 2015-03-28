var mongoose = require('mongoose');

module.exports = function(app) {
	console.log('Hero routes loaded');

	app.get('/api/hero/', function (req, res) {
		var heroModel = mongoose.model('Hero');
		console.log('Getting all heroes...');
		heroModel.find(function(err, heroes) {
			if (err) throw err;
			res.json(heroes);
		});
	});

	app.get('/api/hero/:id', function (req, res) {
		var heroModel = mongoose.model('Hero');

		console.log('Getting specific hero with ID: ' + req.params.id);

		heroModel.findById(req.params.id, function (err, hero) {
			if (err) throw err;

			console.log('Found ' + hero.name);

			res.json(hero);
		});
	});
};
