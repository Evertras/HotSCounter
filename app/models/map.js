var mongoose = require('mongoose');

module.exports = function() {
  mongoose.model('Map', {
    name: String,
    urlName: String,
    imgUrl: String
  });
};
