
var mongoose = require('mongoose');

var mapInit = function (app) {
	var self = this;

	function updateMapCallback(err, foundMap) {
		if (err) { return console.error(err); }
	
		if (foundMap) {
			app.log('Updated map: ' + foundMap.name);
		} else {
			app.log('Initialized map for first time...');
		}
	}

	self.initializeMaps = function() {
		var i = 0;
		var map;
		var mapModel = mongoose.model('Map');

		for (i = 0; i < allMaps.length; ++i) {
			map = allMaps[i];

			mapModel.findOneAndUpdate( { name: map.name }, map, { upsert: true }, updateMapCallback);
		}
	};

	var dragonshire = {
		name: "Dragonshire"
	};

	var cursedHollow = {
		name: "Cursed Hollow"
	};

	var skyTemple = {
		name: "Sky Temple"
	};

	var blackheartsBay = {
		name: "Blackheart's Bay"
	};

	var hauntedMines = {
		name: "Haunted Mines"
	};

	var gardenOfTerror = {
		name: "Garden of Terror"
	};

	var tombOfTheSpiderQueen = {
		name: "Tomb of the Spider Queen"
	};

	var allMaps = [
		dragonshire,
		cursedHollow,
		skyTemple,
		blackheartsBay,
		hauntedMines,
		gardenOfTerror,
		tombOfTheSpiderQueen
	];
};

module.exports = mapInit;
