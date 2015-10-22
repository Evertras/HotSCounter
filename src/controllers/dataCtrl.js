(function() {
    var app = angular.module('dataCtrl', []);

    app.controller('dataCtrl', [function() {
        var circle = d3.selectAll("circle");

        circle.attr('r', 30);
    }]);
})();
