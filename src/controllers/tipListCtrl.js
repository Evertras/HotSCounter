(function() {
	var app = angular.module('tipListCtrl', ['ngRoute', 'heroDataService', 'mapDataService', 'utilDataService']);

	app.controller('tipListCtrl', [
					'$scope',
					'heroDataService',
					'mapDataService',
					'utilDataService',
					'$routeParams',
					'$location',
	function($scope, heroDataService, mapDataService, utilDataService, $routeParams, $location) {
		var type = $location.path().substring(1).indexOf('map') === 0 ? 'map' : 'hero';
		var dataService = type === 'map' ? mapDataService : heroDataService;
		var mySource = utilDataService.mySource;

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

		$scope.upvoteClass = function(tip) {
			if (mySource) {
				var exists = _.find(tip.votes, function(vote) { 
					return vote.source === mySource.source;
				});

				if (exists) {
					if (exists.isUpvote) {
						return "btn-success";
					} else {
						return "";
					}
				} else {
					return "btn-warning";
				}
			}
		};

		$scope.downvoteClass = function(tip) {
			if (mySource) {
				var exists = _.find(tip.votes, function(vote) { 
					return vote.source === mySource.source;
				});

				if (exists) {
					if (exists.isUpvote) {
						return "";
					} else {
						return "btn-danger";
					}
				} else {
					return "btn-warning";
				}
			}
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
