(function() {
	var app = angular.module('heroDataService', ['ngResource']);

	app.factory('heroDataService', ['$resource', '$http', function($resource, $http) {
		var Hero = $resource('api/hero/:heroId', { heroId: '@urlName' });
		var Counter = $resource('api/hero/:heroID/counter/:id',
			{ heroID: '@heroID', id: '@_id' });

		var heroesDictionary = { };

		var heroesRaw = Hero.query(function() {
			for (var i = 0; i < heroesRaw.length; ++i) {
				heroesDictionary[heroesRaw[i]._id] = heroesRaw[i];
			}
		});

		function vote(counter, isUpvote) {
			$http.post('/api/hero/' + counter.heroID + '/counter/' + counter._id, { isUpvote: isUpvote }).success(function () {
				var updatedCounter = Counter.get( { heroID: counter.heroID, id: counter._id }, function() {
					counter.votes = updatedCounter.votes;
				});
			});
		}

		return {
			allHeroes: heroesRaw,

			getHeroByID: function (id) {
				if (heroesDictionary[id]) {
					return heroesDictionary[id];
				} else {
					return Hero.get( { heroId: id } );
				}
			},

			getCountersForHero: function(heroID) {
				return Counter.query( { heroID: heroID } );
			},

			addCounter: function (heroID, details, type, counters) {
				var counter = new Counter({ heroID: heroID, details: details, type: type });

				counter.$save(function(created) {
					counters.push(created);
				});
			},

			deleteCounter: function(counter) {
				Counter.delete({}, counter);
			},

			upvoteCounter: function(counter) {
				vote(counter, true);
			},

			downvoteCounter: function(counter) {
				vote(counter, false);
			}
		};
	}]);
})();
