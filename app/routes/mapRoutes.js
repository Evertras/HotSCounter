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

	app.get('/api/map/:name', function (req, res, next) {
		var mapModel = mongoose.model('Map');
		var searchName = req.params.name.toLowerCase();

		app.log('Getting specific map with name: ' + searchName);

		mapModel.findOne({urlName: searchName}, function (err, map) {
			if (err) {
				next(err);
				return;
			}

			if (map) {
				app.log('Found ' + map.name);
			} else {
				app.log("ERR: Couldn't find map...");
			}

			res.json(map);
		});
	});
};
