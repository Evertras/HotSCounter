var mongoose = require('mongoose');

var mapInit = function(app) {
  var self = this;

  function updateMapCallback(err, foundMap) {
    if (err) {
      return console.error(err); }

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

      var shortenedName = map.name.replace(/[ ]/g, '-').replace(/'/g, '').toLowerCase();

      map.urlName = shortenedName.replace(/-/g, '');

      map.imgUrl = '/img/map/bg_' + shortenedName + '.jpg';

      mapModel.findOneAndUpdate({ name: map.name }, map, { upsert: true }, updateMapCallback);
    }
  };

  var dragonshire = {
    name: "Dragon Shire"
  };

  var battlefieldOfEternity = {
    name: "Battlefield of Eternity"
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

  var braxisHoldout = {
    name: "Braxis Holdout"
  };

  var lostCaverns = {
    name: "Lost Caverns"
  };

  var warheadJunction = {
    name: "Warhead Junction"
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

  var infernalShrines = {
    name: "Infernal Shrines"
  };

  var towersOfDoom = {
    name: "Towers of Doom"
  };

  var allMaps = [
    dragonshire,
    battlefieldOfEternity,
    cursedHollow,
    skyTemple,
    blackheartsBay,
    hauntedMines,
    gardenOfTerror,
    tombOfTheSpiderQueen,
    infernalShrines,
    towersOfDoom,
    lostCaverns,
    braxisHoldout,
    warheadJunction
  ];
};

module.exports = mapInit;
