(function() {
	var app = angular.module('tipList', ['tipListCtrl']);

	app.directive('hcTipList', function() {
		return {
			restrict: 'E',
			templateUrl: 'template/tip-list.html',
			scope: {
				tips: '=tips',
				type: '@type'
			},
			controller: 'tipListCtrl',
			controllerAs: 'tipListCtrl'
		};
	});
})();
