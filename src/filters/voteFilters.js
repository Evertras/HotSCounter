(function() {
	var app = angular.module('voteFilters', []);

	app.filter('totalNetVotes', function () {
		return function (tip) {
			return tip.votes.map(function(vote) {
					return vote.isUpvote ? 1 : -1;
				}).
				reduce(function(prev, cur) {
					return prev + cur;
				}, 0);
		};
	});

	app.filter('totalUpvotes', function () {
		return function (tip) {
			return tip.votes.map(function(vote) {
					return vote.isUpvote ? 1 : 0;
				}).
				reduce(function(prev, cur) {
					return prev + cur;
				}, 0);
		};
	});

	app.filter('totalDownvotes', function () {
		return function (tip) {
			return tip.votes.map(function(vote) {
					return vote.isUpvote ? 0 : 1;
				}).
				reduce(function(prev, cur) {
					return prev + cur;
				}, 0);
		};
	});

	app.filter('percentUpvotes', function () {
		return function (tip) {
			if (tip.votes.length > 0) {
				var totalUpvotes = 
					tip.votes.map(function(vote) {
							return vote.isUpvote ? 1 : 0;
						}).
						reduce(function(prev, cur) {
							return prev + cur;
						}, 0);

				var percentUpvotes = totalUpvotes / tip.votes.length;

				return Math.floor(percentUpvotes * 100) + '%';
			} else {
				return '0%';
			}
		};
	});
})();
