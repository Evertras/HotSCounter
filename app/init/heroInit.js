var mongoose = require('mongoose');

function updateHeroCallback(err, foundHero) {
	if (err) { return console.error(err); }

	if (foundHero) {
		console.log('Updated hero: ' + foundHero.name);
	} else {
		console.log('Initialized hero for first time...');
	}
}

var heroInit = function () {
	var self = this;

	self.initializeHeroes = function() {
		var i = 0;
		var hero;
		var heroModel = mongoose.model('Hero');

		for (i = 0; i < allHeroes.length; ++i)
		{
			hero = allHeroes[i];

			heroModel.findOneAndUpdate( { name: hero.name }, hero, { upsert: true }, updateHeroCallback);
		}
	};

	var warrior = "Warrior";
	var specialist = "Specialist";
	var assassin = "Assassin";
	var support = "Support";

	var abathur = {
		name: "Abathur",
		type: specialist,
		subtitle: "Evolution Master",
		isRanged: false
	};

	var anubarak = {
		name: "Anub'arak",
		type: warrior,
		subtitle: "Traitor King",
		isRanged: false
	};

	var arthas = {
		name: "Arthas",
		type: warrior,
		subtitle: "Lord of the Scourge",
		isRanged: false
	};

	var allHeroes = [
		abathur,
		anubarak,
		arthas
	];
};

module.exports = heroInit;
