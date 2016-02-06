var mongoose = require('mongoose');

var heroInit = function (app) {
	var self = this;

	function updateHeroCallback(err, foundHero) {
		if (err) { return console.error(err); }
	
		if (foundHero) {
			app.log('Updated hero: ' + foundHero.name);
		} else {
			app.log('Initialized hero for first time...');
		}
	}

	self.initializeHeroes = function() {
		var i = 0;
		var hero;
		var heroModel = mongoose.model('Hero');

		for (i = 0; i < allHeroes.length; ++i) {
			hero = allHeroes[i];

			var concatName = hero.name.replace(/ /g, '').replace(/'/g, '');

			hero.imgUrl = 'img/hero/' + concatName + '.png';
			hero.urlName = concatName.replace(/\./g, '').toLowerCase();

			if (freeHeroes.indexOf(hero) !== -1) {
				hero.isFreeWeek = true;
			} else {
				hero.isFreeWeek = false;
			}

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
		isRanged: false,
	};

	var anubarak = {
		name: "Anub'arak",
		type: warrior,
		subtitle: "Traitor King",
		isRanged: false,
	};

	var artanis = {
		name: "Artanis",
		type: warrior,
		subtitle: "Hierarch of the Daelaam",
		isRanged: false,
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

    var chogall = {
        name: "Cho'gall",
        type: warrior,
        subtitle: "Twilight's Hammer Chieftain",
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

  var greymane = {
    name: "Greymane",
    type: assassin,
    subtitle: "Lord of the Worgen",
    isRanged: true
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

	var johanna = {
		name: "Johanna",
		type: warrior,
		subtitle: "Crusader of Zakarum",
		isRanged: false
	};

	var kaelthas = {
		name: "Kael'thas",
		type: assassin,
		subtitle: "Sun King" };

	var kerrigan = {
		name: "Kerrigan",
		type: assassin,
		subtitle: "Queen of Blades",
		isRanged: false
	};

	var kharazim = {
		name: "Kharazim",
		type: support,
		subtitle: "Veradani Monk",
		isRanged: false
	};

	var lili = {
		name: "Li Li",
		type: support,
		subtitle: "World Wanderer",
		isRanged: true
	};

  var liming = {
    name: "Li-Ming",
    type: assassin,
    subtitle: "Rebellious Wizard",
    isRanged: true
  };

	var leoric = {
		name: "Leoric",
		type: warrior,
		subtitle: "Skeleton King",
		isRanged: false
	};

    var ltmorales = {
        name: "Lt. Morales",
        type: support,
        subtitle: "Combat Medic",
        isRanged: true
    };

    var lunara = {
        name: "Lunara",
        type: assassin,
        subtitle: "First Daughter of Cenarius",
        isRanged: true
    };

	var malfurion = {
		name: "Malfurion",
		type: support,
		subtitle: "Archdruid",
		isRanged: true
	};

	var muradin = {
		name: "Muradin",
		type: warrior,
		subtitle: "Mountain King",
		isRanged: false
	};

	var murky = {
		name: "Murky",
		type: specialist,
		subtitle: "Baby Murloc",
		isRanged: false
	};

	var nazeebo = {
		name: "Nazeebo",
		type: specialist,
		subtitle: "Umbaru Heretic",
		isRanged: true
	};

	var nova = {
		name: "Nova",
		type: assassin,
		subtitle: "Dominion Ghost",
		isRanged: true
	};

	var raynor = {
		name: "Raynor",
		type: assassin,
		subtitle: "Renegade Commander",
		isRanged: true
	};

	var rehgar = {
		name: "Rehgar",
		type: support,
		subtitle: "Shaman of the Earthen Ring",
		isRanged: false
	};

	var rexxar = {
		name: "Rexxar",
		type: warrior,
		subtitle: "Champion of the Horde",
		isRanged: true
	};

	var hammer = {
		name: "Sgt. Hammer",
		type: specialist,
		subtitle: "Siege Tank Operator",
		isRanged: true
	};

	var sonya = {
		name: "Sonya",
		type: warrior,
		subtitle: "Wanderer of the North",
		isRanged: false
	};

	var stitches = {
		name: "Stitches",
		type: warrior,
		subtitle: "Terror of Darkshire",
		isRanged: false
	};

	var sylvanas = {
		name: "Sylvanas",
		type: specialist,
		subtitle: "Banshee Queen",
		isRanged: true
	};

	var tassadar = {
		name: "Tassadar",
		type: support,
		subtitle: "Savior of the Templar",
		isRanged: true
	};

	var butcher = {
		name: "The Butcher",
		type: assassin,
		subtitle: "Flesh Carver",
		isRanged: false
	};

	var lostvikings = {
		name: "The Lost Vikings",
		type: specialist,
		subtitle: "Triple Trouble",
		isRanged: false
	};

	var thrall = {
		name: "Thrall",
		type: assassin,
		subtitle: "Warchief of the Horde",
		isRanged: false
	};

	var tychus = {
		name: "Tychus",
		type: assassin,
		subtitle: "Notorious Outlaw",
		isRanged: true
	};

	var tyrael = {
		name: "Tyrael",
		type: warrior,
		subtitle: "Archangel of Justice",
		isRanged: false
	};

	var tyrande = {
		name: "Tyrande",
		type: support,
		subtitle: "High Priestess of Elune",
		isRanged: true
	};

	var uther = {
		name: "Uther",
		type: support,
		subtitle: "Lightbringer",
		isRanged: false
	};

	var valla = {
		name: "Valla",
		type: assassin,
		subtitle: "Vengeance Incarnate",
		isRanged: true
	};

	var zagara = {
		name: "Zagara",
		type: specialist,
		subtitle: "Broodmother of the Swarm",
		isRanged: true
	};

	var zeratul = {
		name: "Zeratul",
		type: assassin,
		subtitle: "Dark Prelate",
		isRanged: false
	};


	var allHeroes = [
		abathur,
		anubarak,
    artanis,
		arthas,
		azmodan,
		brightwing,
		chen,
    chogall,
		diablo,
		etc,
		falstad,
		gazlowe,
    greymane,
		illidan,
		jaina,
		johanna,
		kaelthas,
		kerrigan,
    kharazim,
		lili,
    liming,
		leoric,
    ltmorales,
    lunara,
		malfurion,
		muradin,
		murky,
		nazeebo,
		nova,
		raynor,
		rehgar,
    rexxar,
		hammer,
		sonya,
		stitches,
		sylvanas,
		tassadar,
		butcher,
		lostvikings,
		thrall,
		tychus,
		tyrael,
		tyrande,
		uther,
		valla,
		zagara,
		zeratul
	];

	var freeHeroes = [
    artanis,
    azmodan,
    diablo,
    malfurion,
    thrall,
    valla,
    tychus,
    rehgar,
    jaina,
    chen
	];
};

module.exports = heroInit;
