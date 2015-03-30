var mongoose = require('mongoose');

module.exports = function() {
	var model = mongoose.model('Counter', {
		patch: String,
		source:	String,
		type: String,
		votes: [ { isUpvote: Boolean, source: String, patch: String } ],
		details: String,
		heroID: String
		});

	model.schema.path('type').validate(function (value) {
			return /Counter|Helper/.test(value);
		}, 'Invalid type');

	model.schema.path('details').validate(function (details) {
			return details.length < 512;
		}, 'Details too long');
};
