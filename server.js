//
// # HotsCompServer
//
// HotsComp server
//
var currentPatch = "Sylvanas";

var http = require('http');
var path = require('path');

var express = require('express');
var mongoose = require('mongoose');

var schemas = require('./schemas');
var heroInit = require('./heroInit');

var schemasInstance = new schemas();
var heroInitInstance = new heroInit();

schemasInstance.initModels();
heroInitInstance.initializeHeroes();

schemasInstance.updateModels();

mongoose.connect('mongodb://localhost/hotscomp', function(err) {
  if (err) {
    console.log('DB connection ERROR: ', err);
  } else {
    console.log('DB connection success!');
  }
});

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

router.use(errorHandler);

router.use(express.bodyParser());

// Static content
router.use('/css', express.static(path.resolve(__dirname, 'client', 'css')));
router.use('/js', express.static(path.resolve(__dirname, 'client', 'js')));
router.use('/img', express.static(path.resolve(__dirname, 'client', 'img')));
router.use('/template', express.static(path.resolve(__dirname, 'client', 'template')));

router.get('/', express.static(path.resolve(__dirname, 'client')));

router.get('/api/hero', function(req, res) {
  var heroModel = mongoose.model('Hero');
  heroModel.find(function (err, heroes) {
    if (err) throw err;
    
    res.json(heroes);
  });
});

router.get('/api/hero/:id', function(req, res) {
  var heroModel = mongoose.model('Hero');
  heroModel.findById(req.params.id, function (err, hero) {
    if (err) throw err;
    
    res.json(hero);
  });
});

router.get('/api/hero/:id/counter', function(req, res) {
  var counterModel = mongoose.model('Counter');
  
  counterModel.find({ heroID: req.params.id }, function (err, counters) {
    if (err) throw err;
    
    res.json(counters);
  });
});

router.get('/api/hero/:heroID/counter/:counterID', function(req, res) {
  var counterModel = mongoose.model('Counter');
  
  counterModel.findById(req.params.counterID, function (err, counter) {
    if (err) throw err;
    
    res.json(counter);
  });
});

router.post('/api/hero/:heroID/counter/:counterID', function(req, res) {
  var counterModel = mongoose.model('Counter');
  var modelQuery = { heroID: req.params.heroID, _id: req.params.counterID };
  
  var isUpvote = req.body.isUpvote;
  
  counterModel.findOne(modelQuery, function(err, counter) {
    if (err) throw err;
    
    var source = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    
    for (var i = 0; i < counter.votes.length; ++i) {
      if (counter.votes[i].source == source) {
        if (counter.votes[i].isUpvote === isUpvote) {
          res.end();
        }
        
        counter.votes[i].isUpvote = isUpvote;
        counter.votes[i].patch = currentPatch;
        
        break;
      }
    }

    if (i == counter.votes.length) {
      counter.votes.push({ isUpvote: isUpvote, patch: currentPatch, source: source });
    }
    
    counterModel.update(modelQuery, { votes: counter.votes }, {}, function (err, affected) {
      if (err) throw err;
      
      console.log((isUpvote ? "Upvoted" : "Downvoted") + " successfully: " + counter.details);
      
      res.end();
    });
  });
});

router.post('/api/hero/:id/counter', function(req, res) {
  var counterModel = mongoose.model('Counter');
  
  console.log("Adding counter...");
  console.log(req.body);
  
  if (!req.body.details)
  {
    throw 'Not enough details';
  }
  
  req.body.patch = currentPatch;
  req.body.votes = [];
  req.body.heroID = req.params.id;
  
  if (req.header['x-forwarded-for']) {
    req.body.source = req.header['x-forwarded-for'];
  } else {
    req.body.source = req.connection.remoteAddress;
  }
  
  counterModel.create(req.body, function (err, post) {
    if (err) throw err;
    
    res.json(post);
  });
});

router.delete('/api/hero/:id/counter/:counterID', function(req, res) {
  var counterModel = mongoose.model('Counter');
  
  console.log("Removing counter...");
  
  counterModel.find({ _id: req.params.counterID }).remove().exec();
  
  res.end();
});


// Start the server

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Hotscomp server listening at", addr.address + ":" + addr.port);
});
