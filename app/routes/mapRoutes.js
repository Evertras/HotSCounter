
var mongoose = require('mongoose');

module.exports = function(app) {
	app.log('Map routes loaded');

	app.get('/api/map/', function (req, res, next) {
		var mapModel = mongoose.model('Map');
		app.log('Getting all maps...');
		mapModel.find(function(err, maps) {
			if (err) {
				next(err);
				return;
			}

			res.json(maps);
		});
	});

	app.get('/api/map/:id', function (req, res, next) {
		var mapModel = mongoose.model('Map');

		app.log('Getting specific map with ID: ' + req.params.id);

		mapModel.findById(req.params.id, function (err, map) {
			if (err) {
				next(err);
				return;
			}

			app.log('Found ' + map.name);

			res.json(map);
		});
	});
};
