var mongoose = require('mongoose');

module.exports = mongoose.model('Hero', {
	name: String,
	subtitle: String,
	type: String,
	isRanged: Boolean
	}).
		schema.path('type').validate(function (value) {
			return /Warrior|Support|Assassin|Specialist/.test(value);
		}, 'Invalid type');
