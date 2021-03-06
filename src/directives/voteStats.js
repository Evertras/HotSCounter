(function() {
  var app = angular.module('voteStats', ['heroDataService', 'mapDataService']);

  app.directive('voteStats', function() {
    return {
      restrict: 'E',
      //template: '{{tipTotal}} tips added and {{voteTotal}} votes tallied so far!',
      template: '{{tipTotal}} tips added so far!',
      controller: ['$http', '$scope', '$rootScope', function($http, $scope, $rootScope) {
        $scope.tipTotal = 0;
        $scope.voteTotal = 0;

        function updateTotals() {
          $http.get("/api/counter/total").success(function(data) {
            $scope.tipTotal = data.total;
          });

          $http.get("/api/counter/totalvotes").success(function(data) {
            $scope.voteTotal = data.total;
          });
        }

        $rootScope.$on("$viewContentLoaded", function() {
          updateTotals();
        });
      }]
    };
  });
})();
