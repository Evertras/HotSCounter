(function() {
	var app = angular.module('heroDetailCtrl', ['ngRoute', 'heroDataService', 'tipList', 'utilDataService']);

	app.controller('heroDetailCtrl', ['$scope', 'heroDataService', '$routeParams', 'utilDataService', 
		function($scope, heroDataService, $routeParams, utilDataService) {
			$scope.hero = heroDataService.getHeroByID($routeParams.heroId);
			$scope.counters = heroDataService.getCountersForHero($routeParams.heroId);
			$scope.mySource = utilDataService.mySource;

			$scope.upvote = function(counter) {
				heroDataService.upvoteCounter(counter);
			};

			$scope.downvote = function(counter) {
				heroDataService.downvoteCounter(counter);
			};

			$scope.voteTotal = function(counter) {
				return counter.votes.map(function(vote) {
					return vote.isUpvote ? 1 : -1;
				}).
				reduce(function(prev, cur) {
					return prev + cur;
				}, 0);
			};

			$scope.addCounter = function() {
				heroDataService.addCounter($scope.hero._id, $scope.counterText, 'Counter', $scope.counters);

				$scope.counterText = "";
			};

			$scope.addHelper = function() {
				heroDataService.addCounter($scope.hero._id, $scope.helperText, 'Helper', $scope.counters);

				$scope.helperText = "";
			};
		}
	]);
})();
