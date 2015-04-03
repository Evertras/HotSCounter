(function() {
	var app = angular.module('voteStats', [ 'heroDataService', 'mapDataService' ]);

	app.directive('voteStats', function() {
		return {
			restrict: 'E',
			template: '{{tipTotal}} tips added and {{voteTotal}} votes tallied so far!',
			controller: ['$http', '$scope', function($http, $scope) {
				$scope.tipTotal = 0;
				$scope.voteTotal = 0;

				$http.get("/api/counter/total").success(function(data) {
					$scope.tipTotal = data.total;
				});

				$http.get("/api/counter/totalvotes").success(function(data) {
					$scope.voteTotal = data.total;
				});
			}]
		};
	});
})();
