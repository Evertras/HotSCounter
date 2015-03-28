(function() {
	var app = angular.module('heroListCtrl', ['heroDataService']);

	app.controller('heroListCtrl', ['heroDataService', '$scope', function(heroDataService, $scope) {
		$scope.allHeroes = heroDataService.allHeroes;
	}]);
})();
