(function() {
	var app = angular.module('heroListCtrl', ['heroDataService']);

	app.controller('heroListCtrl', ['heroDataService', '$scope', function(heroDataService, $scope) {
		$scope.allHeroes = heroDataService.allHeroes;

		$scope.allHeroChunks = [];

		$scope.$watch(function(scope) { return scope.allHeroes.length; },
			function() {
				$scope.allHeroChunks = [];

				var chunks = 3;

				var split = Math.ceil($scope.allHeroes.length / 3);

				if (split > 1) {
					var sortedHeroes = _.sortBy($scope.allHeroes, 'name');

					for (var i = 0; i < chunks; ++i) {
						$scope.allHeroChunks.push(sortedHeroes.slice(split*i, split*i + split));
					}
				}
			});
	}]);
})();
