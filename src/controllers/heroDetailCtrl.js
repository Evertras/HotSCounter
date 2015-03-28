(function() {
	var app = angular.module('heroDetailCtrl', ['ngRoute', 'heroDataService']);

	app.controller('heroDetailCtrl', ['$scope', 'heroDataService', '$routeParams', function($scope, heroDataService, $routeParams) {
		$scope.hero = heroDataService.getHeroByID($routeParams.heroId);
		$scope.counters = heroDataService.getCountersForHero($routeParams.heroId);

		$scope.upvote = function(counter) {
			heroDataService.upvoteCounter(counter);
		};

		$scope.downvote = function(counter) {
			heroDataService.downvoteCounter(counter);
		};

		$scope.addCounter = function() {
			heroDataService.addCounter($scope.hero._id, $scope.counterText, 'Counter', $scope.counters);

			$scope.counterText = "";
		};

		$scope.addHelper = function() {
			heroDataService.addCounter($scope.hero._id, $scope.helperText, 'Helper', $scope.counters);

			$scope.helperText = "";
		};
	}]);
})();
