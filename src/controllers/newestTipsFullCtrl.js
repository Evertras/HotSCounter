(function() {
	var app = angular.module('newestTipsFullCtrl', []);

	app.controller('newestTipsFullCtrl', ['$http', '$scope', function($http, $scope) {
		var maxTips = 50;

		function updateNewestTips() {
			$http.get('/api/counter/newest/' + maxTips).success(function (result) {
				$scope.newestTips = result;
			});
		}

		updateNewestTips();

		setInterval(updateNewestTips, 60 * 1000);
	}]);
})();
