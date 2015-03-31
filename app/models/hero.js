var mongoose = require('mongoose');

module.exports = function() {
	mongoose.model('Hero', {
		name: String,
		urlName: String,
		subtitle: String,
		type: String,
		isRanged: Boolean,
		imgUrl: String
		}).
		schema.path('type').validate(function (value) {
			return /Warrior|Support|Assassin|Specialist/.test(value);
		}, 'Invalid type');
};
