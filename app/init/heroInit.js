var mongoose = require('mongoose');

var heroInit = function(app) {
  var self = this;

  function updateHeroCallback(err, foundHero) {
    if (err) {
      return console.error(err);
    }

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

      heroModel.findOneAndUpdate({ name: hero.name }, hero, { upsert: true }, updateHeroCallback);
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

  var alarak = {
    name: "Alarak",
    type: assassin,
    subtitle: "Highlord of the Taldarim",
    isRanged: false
  };

  var alexstrasza = {
    name: "Alexstrasza",
    type: support,
    subtitle: "Life Binder",
    isRanged: true
  };

  var ana = {
    name: "Ana",
    type: support,
    subtitle: "Veteran Sniper",
    isRanged: true
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

  var auriel = {
    name: "Auriel",
    type: support,
    subtitle: "Archangel of Hope",
    isRanged: true
  };

  var azmodan = {
    name: "Azmodan",
    type: specialist,
    subtitle: "Lord of Sin",
    isRanged: true
  };

  var blaze = {
    name: "Blaze",
    type: warrior,
    subtitle: "Veteran Firebat",
    isRanged: true
  };

  var brightwing = {
    name: "Brightwing",
    type: specialist,
    subtitle: "Faerie Dragon",
    isRanged: true
  };

  var cassia = {
    name: "Cassia",
    type: assassin,
    subtitle: "Amazon Warmatron",
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

  var chromie = {
    name: "Chromie",
    type: assassin,
    subtitle: "Keeper of Time",
    isRanged: true
  };

  var dehaka = {
    name: "Dehaka",
    type: warrior,
    subtitle: "Primal Pack Leader",
    isRanged: false
  };

  var diablo = {
    name: "Diablo",
    type: warrior,
    subtitle: "Lord of Terror",
    isRanged: false
  };

  var dva = {
    name: "D.Va",
    type: warrior,
    subtitle: "MEKA Pilot",
    isRanged: true
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

  var garrosh = {
    name: "Garrosh",
    type: warrior,
    subtitle: "Son of Hellscream",
    isRanged: false
  };

  var gazlowe = {
    name: "Gazlowe",
    type: specialist,
    subtitle: 'Boss of Ratchet',
    isRanged: false
  };

  var genji = {
    name: "Genji",
    type: assassin,
    subtitle: "Cybernetic Ninja",
    isRanged: true
  };

  var greymane = {
    name: "Greymane",
    type: assassin,
    subtitle: "Lord of the Worgen",
    isRanged: true
  };

  var guldan = {
    name: "Gul'dan",
    type: assassin,
    subtitle: "Darkness Incarnate",
    isRanged: true
  };

  var hanzo = {
    name: "Hanzo",
    type: assassin,
    subtitle: "Master Assasin",
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

  var junkrat = {
    name: "Junkrat",
    type: assassin,
    subtitle: "Junker Demolitionist",
    isRanged: true
  };

  var kaelthas = {
    name: "Kael'thas",
    type: assassin,
    subtitle: "Sun King",
    isRanged: true
  };

  var kelthuzad = {
    name: "Kel'Thuzad",
    type: assassin,
    subtitle: "Archlich of Naxxramas",
    isRanged: true
  };

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

  var lucio = {
    name: "Lucio",
    type: support,
    subtitle: "Freedom Fighting DJ",
    isRanged: true
  };

  var lunara = {
    name: "Lunara",
    type: assassin,
    subtitle: "First Daughter of Cenarius",
    isRanged: true
  };

  var maiev = {
    name: "Maiev",
    type: assassin,
    subtitle: "Warden",
    isRanged: false
  };

  var malfurion = {
    name: "Malfurion",
    type: support,
    subtitle: "Archdruid",
    isRanged: true
  };

  var malthael = {
    name: "Malthael",
    type: assassin,
    subtitle: "Aspect of Death",
    isRanged: false
  };

  var medivh = {
    name: "Medivh",
    type: specialist,
    subtitle: "Last Guardian",
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

  var probius = {
    name: "Probius",
    type: specialist,
    subtitle: "Brave Probe",
    isRanged: true
  };

  var ragnaros = {
    name: "Ragnaros",
    type: assassin,
    subtitle: "Firelord",
    isRanged: false
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

  var samuro = {
    name: "Samuro",
    type: assassin,
    subtitle: "Blademaster",
    isRanged: false
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

  var stukov = {
    name: "Stukov",
    type: support,
    subtitle: "Infested Admiral",
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

  var tracer = {
    name: "Tracer",
    type: assassin,
    subtitle: "Agent of Overwatch",
    isRanged: true
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

  var valeera = {
    name: "Valeera",
    type: assassin,
    subtitle: "Shadow of the Uncrowned",
    isRanged: false
  };

  var valla = {
    name: "Valla",
    type: assassin,
    subtitle: "Vengeance Incarnate",
    isRanged: true
  };

  var varian = {
    name: "Varian",
    type: warrior,
    subtitle: "High King of the Alliance",
    isRanged: false
  };

  var xul = {
    name: "Xul",
    type: specialist,
    subtitle: "Cryptic Necromancer",
    isRanged: false
  };

  var zagara = {
    name: "Zagara",
    type: specialist,
    subtitle: "Broodmother of the Swarm",
    isRanged: true
  };

  var zarya = {
    name: "Zarya",
    type: warrior,
    subtitle: "Defender of Russia",
    isRanged: true
  };

  var zeratul = {
    name: "Zeratul",
    type: assassin,
    subtitle: "Dark Prelate",
    isRanged: false
  };

  var zuljin = {
    name: "Zul'jin",
    type: assassin,
    subtitle: "Warlord of the Amani",
    isRanged: true
  };

  var allHeroes = [
    abathur,
    alarak,
    alexstrasza,
    ana,
    anubarak,
    artanis,
    arthas,
    auriel,
    azmodan,
    blaze,
    brightwing,
    cassia,
    chen,
    chogall,
    chromie,
    dehaka,
    diablo,
    dva,
    etc,
    falstad,
    garrosh,
    gazlowe,
    genji,
    greymane,
    guldan,
    hanzo,
    illidan,
    jaina,
    johanna,
    junkrat,
    kaelthas,
    kelthuzad,
    kerrigan,
    kharazim,
    lili,
    liming,
    leoric,
    ltmorales,
    lucio,
    lunara,
    maiev,
    malfurion,
    malthael,
    medivh,
    muradin,
    murky,
    nazeebo,
    nova,
    probius,
    ragnaros,
    raynor,
    rehgar,
    rexxar,
    hammer,
    samuro,
    sonya,
    stitches,
    stukov,
    sylvanas,
    tassadar,
    tracer,
    butcher,
    lostvikings,
    thrall,
    tychus,
    tyrael,
    tyrande,
    uther,
    varian,
    valeera,
    valla,
    xul,
    zarya,
    zagara,
    zeratul,
    zuljin
  ];

  var freeHeroes = [];
};

module.exports = heroInit;

