var assert = require('assert');
var should = require('should');

var counterModel = require('./../models/counter.js')();
var heroModel = require('./../models/hero.js')();
var mongoose = require('mongoose');
var Counter = mongoose.model('Counter');
var Hero = mongoose.model('Hero');

var dbURI = 'mongodb://localhost/counterModelTests';
var clearDB = require('mocha-mongoose')(dbURI);

var sampleHero;

describe('Counter Model', function() {
	before(function(done) {
		if (mongoose.connection.db) return done();

		mongoose.connect(dbURI, function(err) {
			if (err) throw err;
			sampleHero = new Hero ({
				name: "Sample Hero",
				type: "Warrior",
				subtitle: "Sample Master",
				isRanged: true
			});

			sampleHero.save(done);
		});
	});

	it('should save correctly with valid values', function(done) {
		var counter = new Counter({
			patch: "Test Patch",
		    	source: "0.0.0.0",
		    	type: "Counter",
		    	votes: [],
		    	details: "A counter of some sort",
		    	heroID: sampleHero._id
		});
		console.log(counter);

		counter.save(done);
	});

	it('should not save correctly with invalid type', function(done) {
		var counter = new Counter({
			patch: "Test Patch",
		    	source: "0.0.0.0",
		    	type: "Invalid type",
		    	votes: [],
		    	details: "A counter of some sort",
		    	heroID: sampleHero._id
		});

		counter.save(function(err) {
			should.exist(err);
			(err).should.have.property('message', 'Validation failed');
			done();
		});
	});

	it('should not save correctly with too-long details', function(done) {
		var counter = new Counter({
			patch: "Test Patch",
		    	source: "0.0.0.0",
		    	type: "Counter",
		    	votes: [],
		    	details: "Repeat ",
		    	heroID: sampleHero._id
		});

		var maxChars = 1024;
		
		for (var i = 0; i < maxChars + 1; ++i)
		{
			counter.details += 'x';
		}

		counter.save(function(err) {
			should.exist(err);
			done();
		});
	});
});
