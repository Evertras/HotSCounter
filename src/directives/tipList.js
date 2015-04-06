(function() {
	var app = angular.module('tipList', ['tipListCtrl']);

	app.directive('hcTipList', function() {
		return {
			restrict: 'E',
			templateUrl: 'template/tip-list.html',
			scope: {
				tips: '=',
				type: '@',
				canAdd: '@'
			},
			controller: 'tipListCtrl',
			controllerAs: 'tipListCtrl'
		};
	});
})();
