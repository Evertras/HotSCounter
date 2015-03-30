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

		for (i = 0; i < allHeroes.length; ++i) {
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

	var azmodan = {
		name: "Azmodan",
		type: specialist,
		subtitle: "Lord of Sin",
		isRanged: true
	};

	var brightwing = {
		name: "Brightwing",
		type: specialist,
		subtitle: "Faerie Dragon",
		isRanged: true
	};

	var chen = {
		name: "Chen",
		type: warrior,
		subtitle: "Legendary Brewmaster",
		isRanged: false
	};

	var diablo = {
		name: "Diablo",
		type: warrior,
		subtitle: "Lord of Terror",
		isRanged: false
	};

	var etc = {
		name: "E.T.C.",
		type: warrior,
		subtitle: "Rock God",
		isRanged: false
	};

	var falstad = {
		name: "Falstad",
		type: assassin,
		subtitle: "Wildhammer Thane",
		isRanged: true
	};

	var gazlowe = {
		name: "Gazlowe",
		type: specialist,
		subtitle: 'Boss of Ratchet',
		isRanged: false
	};

	var illidan = {
		name: "Illidan",
		type: assassin,
		subtitle: "Betrayer",
		isRanged: false
	};

	var jaina = {
		name: "Jaina",
		type: assassin,
		subtitle: "Archmage of Kirin Tor",
		isRanged: true
	};

	var kerrigan = {
		name: "Kerrigan",
		type: assassin,
		subtitle: "Queen of Blades",
		isRanged: false
	};

	var lili = {
		name: "Li Li",
		type: support,
		subtitle: "World Wanderer",
		isRanged: true
	};

	var malfurion = {
		name: "Malfurion",
		type: support,
		subtitle: "Archdruid",
		isRanged: true
	};

	var allHeroes = [
		abathur,
		anubarak,
		arthas,
		azmodan,
		brightwing,
		chen,
		diablo,
		etc,
		falstad,
		gazlowe,
		illidan,
		jaina,
		kerrigan,
		lili,
		malfurion
	];
};

module.exports = heroInit;
