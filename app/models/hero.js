var mongoose = require('mongoose');

module.exports = mongoose.model('Hero', {
	name: String,
	subtitle: String,
	type: String,
	isRanged: Boolean
	});
