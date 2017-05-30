(function() {
  var app = angular.module('mapDataService', ['ngResource']);

  app.factory('mapDataService', ['$resource', '$http', function($resource, $http) {
    var Map = $resource('api/map/:mapID', { mapID: '@_id' });
    var Counter = $resource('api/map/:mapID/counter/:id', { mapID: '@mapID', id: '@_id' });

    var mapsDictionary = {};

    var mapsRaw = Map.query(function() {
      for (var i = 0; i < mapsRaw.length; ++i) {
        mapsDictionary[mapsRaw[i]._id] = mapsRaw[i];
      }
    });

    function vote(counter, isUpvote) {
      $http.post('/api/map/' + counter.heroID + '/counter/' + counter._id, { isUpvote: isUpvote }).success(function() {
        var updatedCounter = Counter.get({ mapID: counter.heroID, id: counter._id }, function() {
          counter.votes = updatedCounter.votes;
        });
      });
    }

    return {
      allMaps: mapsRaw,

      getMapByID: function(id) {
        if (mapsDictionary[id]) {
          return mapsDictionary[id];
        } else {
          return Map.get({ mapID: id });
        }
      },

      getCountersForMap: function(mapID) {
        return Counter.query({ mapID: mapID });
      },

      addCounter: function(mapID, details, counters) {
        var counter = new Counter({ mapID: mapID, details: details, type: 'Helper' });

        counter.$save(function(created) {
          counters.push(created);
        });
      },

      deleteCounter: function(counter) {
        Counter.delete({}, counter);
      },

      upvoteCounter: function(counter) {
        vote(counter, true);
      },

      downvoteCounter: function(counter) {
        vote(counter, false);
      }
    };
  }]);
})();
