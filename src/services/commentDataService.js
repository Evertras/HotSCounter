(function() {
  var app = angular.module('commentDataService', ['ngResource']);

  app.factory('commentDataService', ['$resource', '$http', function($resource, $http) {
    var Counter = $resource('api/counter/:id', { id: '@_id' });

    return {
      addComment: function(counter, commentText) {
        $http.post('/api/counter/' + counter._id + '/comment/', { text: commentText }).success(function() {
          var updatedCounter = Counter.get({ id: counter._id }, function() {
            counter.comments = updatedCounter.comments;
          });
        });
      }
    };
  }]);
})();
