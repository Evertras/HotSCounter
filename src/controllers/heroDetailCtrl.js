(function() {
  var app = angular.module('heroDetailCtrl', ['ngRoute', 'heroDataService', 'tipList', 'utilDataService']);

  app.controller('heroDetailCtrl', ['$scope', 'heroDataService', '$routeParams', 'utilDataService', '$rootScope', '$window',
    function($scope, heroDataService, $routeParams, utilDataService, $rootScope, $window) {
      $scope.hero = heroDataService.getHeroByID($routeParams.heroId);
      $scope.counters = heroDataService.getCountersForHero($routeParams.heroId);
      $scope.mySource = utilDataService.mySource;

      $rootScope.$watch(function() {
        return $scope.hero.name; }, function() {
        if ($scope.hero.name) {
          $rootScope.title = ' - ' + $scope.hero.name;
        } else {
          $rootScope.title = '';
        }
      });

      $rootScope.title = ' - ' + $scope.hero.name;

      $scope.upvote = function(counter) {
        heroDataService.upvoteCounter(counter);
      };

      $scope.downvote = function(counter) {
        heroDataService.downvoteCounter(counter);
      };

      $scope.voteTotal = function(counter) {
        return counter.votes.map(function(vote) {
          return vote.isUpvote ? 1 : -1;
        }).
        reduce(function(prev, cur) {
          return prev + cur;
        }, 0);
      };

      $scope.addCounter = function() {
        heroDataService.addCounter($scope.hero._id, $scope.counterText, 'Counter', $scope.counters);

        $scope.counterText = "";
      };

      $scope.addHelper = function() {
        heroDataService.addCounter($scope.hero._id, $scope.helperText, 'Helper', $scope.counters);

        $scope.helperText = "";
      };

      $("#share-buttons a").click(function() {
        var sharedTo = $(this).children('img').attr('alt');

        $window.ga('send', 'event', 'Shared', sharedTo, $scope.hero.name);
      });

      $(".counterPickLink").click(function() {
        $window.ga('send', 'event', 'ReferredTo', 'HeroesCounters', $scope.hero.name);
      });

      $(".hotslogsLink").click(function() {
        $window.ga('send', 'event', 'ReferredTo', 'HotsLogs', $scope.hero.name);
      });
    }
  ]);
})();
