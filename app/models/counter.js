var mongoose = require('mongoose');

module.exports = mongoose.model('Counter', {
	patch: String,
	source: String,
	type: String,
	votes: [ { isUpvote: Boolean, source: String, patch: String } ],
	details: String,
	heroID: String
	});
