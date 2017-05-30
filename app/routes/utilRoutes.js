var source = require('./../util/source');

module.exports = function(app) {
  app.log('Util routes loaded');

  app.get('/api/source/', function(req, res) {
    var src = source(req);
    app.log('Getting source IP for ' + src);

    res.json({ source: src });
  });
};
