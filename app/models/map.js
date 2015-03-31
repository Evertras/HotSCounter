
var mongoose = require('mongoose');

module.exports = function() {
	mongoose.model('Map', {
		name: String,
		imgUrl: String
	});
};
