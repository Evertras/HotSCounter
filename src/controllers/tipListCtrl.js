(function() {
	var app = angular.module('tipListCtrl', ['ngRoute', 'heroDataService']);

	app.controller('tipListCtrl', ['$scope', 'heroDataService', '$routeParams', function($scope, heroDataService, $routeParams) {
		var self = this;

		$scope.voteTotal = function(tip) {
			return tip.votes.map(function(vote) {
					return vote.isUpvote ? 1 : -1;
				}).
				reduce(function(prev, cur) {
					return prev + cur;
				}, 0);
		};

		$scope.upvote = function(tip) {
			heroDataService.upvoteCounter(tip);
		};

		$scope.downvote = function(tip) {
			heroDataService.downvoteCounter(tip);
		};

		$scope.addTip = function() {
			heroDataService.addCounter($routeParams.heroId, $scope.tipText, $scope.type, $scope.tips);

			$scope.tipText = "";
		};
	}]);
})();

/*
		$scope.addCounter = function() {
			heroDataService.addCounter($scope.hero._id, $scope.counterText, 'Counter', $scope.counters);

			$scope.counterText = "";
		};

		$scope.addHelper = function() {
			heroDataService.addCounter($scope.hero._id, $scope.helperText, 'Helper', $scope.counters);

			$scope.helperText = "";
		};
*/
