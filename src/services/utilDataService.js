(function() {
	var app = angular.module('utilDataService', ['ngResource']);

	app.factory('utilDataService', ['$resource', function($resource) {
		var Source = $resource('api/source');

		var mySource = Source.get();

		return {
			mySource: mySource
		};
	}]);
})();
