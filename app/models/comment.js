var mongoose = require('mongoose');

module.exports = function() {
  var model = mongoose.model('Comment', {
    patch: String,
    source: String,
    type: String,
    votes: [{ isUpvote: Boolean, source: String, patch: String }],
    details: String,
    commentID: String
  });

  model.schema.path('details').validate(function(details) {
    return details.length < 1024;
  }, 'Details too long');
};
