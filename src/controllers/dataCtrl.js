(function() {
  var app = angular.module('dataCtrl', []);

  app.controller('dataCtrl', ['heroDataService', '$scope', function(heroDataService, $scope) {
    $scope.heroes = heroDataService.allHeroes;

    function updateSvg() {
      var svg = d3.select("svg");
      var circle = svg.selectAll("circle")
        .data($scope.heroes);

      circle.enter().append('circle')
        .attr('cy', function(d) {
          return d.name.length * 40; })
        .attr('cx', 80)
        .attr('r', 0)
        .transition()
        .attr('r', function(d) {
          return d.name.length * 2; });

      circle.exit().remove();
    }

    updateSvg();

    setInterval(updateSvg, 1000);

    $scope.watch(function() {
        return $scope.heroes.length; },
      function() {
        window.console.log('djffdj');

        updateSvg();
      });
  }]);
})();
