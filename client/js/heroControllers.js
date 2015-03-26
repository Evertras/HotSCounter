(function() {
    var app = angular.module('heroControllers', ['ngRoute']);
    
    app.controller('heroDetailCtrl', ['heroDataService', '$scope', '$routeParams', function (heroDataService, $scope, $routeParams) {
        $scope.hero = heroDataService.getHeroByID($routeParams.heroId);
        $scope.counters = heroDataService.getCountersForHero($routeParams.heroId);
        
        $scope.delete = function(counter) {
            if (confirm("Are you sure you want to delete: " + counter.details))
            {
                heroDataService.deleteCounter(counter);
                $scope.counters.splice($scope.counters.indexOf(counter), 1);
            }
        };
        
        $scope.upvote = function(counter) {
            heroDataService.upvoteCounter(counter);
        };
        
        $scope.downvote = function(counter) {
            heroDataService.downvoteCounter(counter);
        };
        
        $scope.voteTotal = function(counter) {
            return counter.votes.map(function(vote) { return vote.isUpvote ? 1 : -1; }).reduce(function(prev, cur) { return prev + cur; }, 0);
        };
        
        $scope.addCounter = function() {
            heroDataService.addCounter($scope.hero._id, $scope.counterText, 'Counter', $scope.counters);
            
            $scope.counterText = "";
        };
        
        $scope.addHelper = function() {
            heroDataService.addCounter($scope.hero._id, $scope.helperText, 'Helper', $scope.counters);
            
            $scope.helperText = "";
        };
    }]);
})();