
(function() {
	var app = angular.module('mapDetailCtrl', ['ngRoute', 'mapDataService', 'tipList']);

	app.controller('mapDetailCtrl', ['$scope', 'mapDataService', '$routeParams', function($scope, mapDataService, $routeParams) {
		$scope.map = mapDataService.getMapByID($routeParams.mapId);
		$scope.counters = mapDataService.getCountersForMap($routeParams.mapId);

		$scope.upvote = function(counter) {
			mapDataService.upvoteCounter(counter);
		};

		$scope.downvote = function(counter) {
			mapDataService.downvoteCounter(counter);
		};

		$scope.voteTotal = function(counter) {
			return counter.votes.map(function(vote) {
				return vote.isUpvote ? 1 : -1;
			}).
			reduce(function(prev, cur) {
				return prev + cur;
			}, 0);
		};

		$scope.addHelper = function() {
			mapDataService.addCounter($scope.map._id, $scope.helperText, $scope.counters);

			$scope.helperText = "";
		};
	}]);
})();
