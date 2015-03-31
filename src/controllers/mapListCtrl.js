
(function() {
	var app = angular.module('mapListCtrl', ['mapDataService']);

	app.controller('mapListCtrl', ['mapDataService', '$scope', function(mapDataService, $scope) {
		$scope.allMaps = mapDataService.allMaps;

		$scope.allMapChunks = [];

		$scope.$watch(function(scope) { return scope.allMaps.length; },
			function() {
				$scope.allMapChunks = [];

				var chunks = 3;

				var split = Math.ceil($scope.allMaps.length / 3);

				if (split > 1) {
					var sortedMaps = _.sortBy($scope.allMaps, 'name');

					for (var i = 0; i < chunks; ++i) {
						$scope.allMapChunks.push(sortedMaps.slice(split*i, split*i + split));
					}
				}
			});
	}]);
})();
