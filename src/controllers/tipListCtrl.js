(function() {
	var app = angular.module('tipListCtrl', ['ngRoute', 'heroDataService']);

	app.controller('tipListCtrl', [
					'$scope',
					'heroDataService',
					'mapDataService',
					'$routeParams',
					'$location',
	function($scope, heroDataService, mapDataService, $routeParams, $location) {
		var type = ($location.path().substring(1).indexOf('map') === 0) ? 'map' : 'hero';
		var dataService = type === 'map' ? mapDataService : heroDataService;
		var typeId = type === 'map' ? $routeParams.mapId : $routeParams.heroId;

		$scope.voteTotal = function(tip) {
			return tip.votes.map(function(vote) {
					return vote.isUpvote ? 1 : -1;
				}).
				reduce(function(prev, cur) {
					return prev + cur;
				}, 0);
		};

		$scope.upvote = function(tip) {
			dataService.upvoteCounter(tip);
		};

		$scope.downvote = function(tip) {
			dataService.downvoteCounter(tip);
		};

		$scope.addTip = function() {
			if (type === 'hero') {
				heroDataService.addCounter($routeParams.heroId, $scope.tipText, $scope.type, $scope.tips);
			} else {
				mapDataService.addCounter($routeParams.mapId, $scope.tipText, $scope.tips);
			}

			$scope.tipText = "";
		};
	}]);
})();
