(function() {
	var app = angular.module('tipListCtrl', ['ngRoute', 'heroDataService', 'mapDataService', 'commentDataService', 'utilDataService', 'voteFilters']);

	app.controller('tipListCtrl', [
					'$scope',
					'$http',
					'heroDataService',
					'mapDataService',
					'commentDataService',
					'utilDataService',
					'$routeParams',
					'$location',
	function($scope, $http, heroDataService, mapDataService, commentDataService, utilDataService, $routeParams, $location) {
		var type = $location.path().substring(1).indexOf('map') === 0 ? 'map' : 'hero';
		var dataService = type === 'map' ? mapDataService : heroDataService;
		var mySource = utilDataService.mySource;

		$scope.voteTotal = function(tip) {
			return tip.votes.map(function(vote) {
					return vote.isUpvote ? 1 : -1;
				}).
				reduce(function(prev, cur) {
					return prev + cur;
				}, 0);
		};

		if ($scope.sort === 'newest') {
			$scope.sortFunc = function(tip) {
				return tip._id;
			};
		} else {
			$scope.sortFunc = $scope.voteTotal;
		}

		$scope.upvote = function(tip) {
			dataService.upvoteCounter(tip);
		};

		$scope.downvote = function(tip) {
			dataService.downvoteCounter(tip);
		};

		$scope.upvoteClass = function(tip) {
			if (mySource) {
				var exists = _.find(tip.votes, function(vote) { 
					return vote.source === mySource.source;
				});

				if (exists) {
					if (exists.isUpvote) {
						return "btn-success";
					} else {
						return "";
					}
				} else {
					return "btn-warning";
				}
			}
		};

		$scope.downvoteClass = function(tip) {
			if (mySource) {
				var exists = _.find(tip.votes, function(vote) { 
					return vote.source === mySource.source;
				});

				if (exists) {
					if (exists.isUpvote) {
						return "";
					} else {
						return "btn-danger";
					}
				} else {
					return "btn-warning";
				}
			}
		};

		$scope.addTip = function() {
			if (type === 'hero') {
				heroDataService.addCounter($routeParams.heroId, $scope.tipText, $scope.type, $scope.tips);
			} else {
				mapDataService.addCounter($routeParams.mapId, $scope.tipText, $scope.tips);
			}

			$scope.tipText = "";
		};

		$scope.addComment = function(tip) {
			commentDataService.addComment(tip, tip.newCommentText);

			tip.newCommentText = "";
		};

		var portraitData = { };

		$scope.allHeroes = heroDataService.allHeroes;
		$scope.allMaps = mapDataService.allMaps;

		$scope.$watch(function() { return $scope.allHeroes.length; },
			function() {
				var i;

				for (i = 0; i < $scope.allHeroes.length; ++i) {
					var hero = $scope.allHeroes[i];

					var data = {
						src: hero.imgUrl,
						title: hero.name,
						url: '/#/hero/' + hero.urlName
					};

					portraitData[hero._id.toString()] = data;
					portraitData[hero.urlName] = data;
				}
			});
		
		$scope.$watch(function() { return $scope.allMaps.length; },
			function() {
				var i;

				for (i = 0; i < $scope.allMaps.length; ++i) {
					var map = $scope.allMaps[i];

					var data = {
						src: map.imgUrl,
						title: map.name,
						url: '/#/map/' + map.urlName.toString()
					};

					portraitData[map._id.toString()] = data;
					portraitData[map.urlName] = data;
				}
			});

		$scope.getPortraitSrc = function (tip) {
			if (portraitData[tip.heroID]) {
				return portraitData[tip.heroID].src;
			} else {
				return '//:0';
			}
		};

		$scope.getPortraitTitle = function (tip) {
			if (portraitData[tip.heroID]) {
				return portraitData[tip.heroID].title;
			} else {
				return 'ERR';
			}
		};

		$scope.getPortraitUrl = function (tip) {
			if (portraitData[tip.heroID]) {
				return portraitData[tip.heroID].url;
			} else {
				return '#';
			}
		};

		$scope.getTipDetails = function (tip) {
			var maxLen = 150;

			if ($scope.shortened) {
				if (tip.details.length > maxLen) {
					return tip.details.substring(0, maxLen -1) + "...";
				}
			}

			return tip.details;
		};
	}]);
})();
