var assert = require('assert');
var should = require('should');

var heroModel = require('./../models/hero.js');
var mongoose = require('mongoose');
var Hero = mongoose.model('Hero');

var dbURI = 'mongodb://localhost/heroModelTests';
var clearDB = require('mocha-mongoose')(dbURI);

describe('Hero', function() {
	beforeEach(function(done) {
		if (mongoose.connection.db) return done();

		mongoose.connect(dbURI, done);
	});

	it('should save correctly with valid values', function(done) {
		var hero = new Hero({
			name: "Test Hero",
		    	subtitle: "Master of Tests",
		    	type: "Warrior",
		    	isRanged: false
		});

		hero.save(done);
	});

	it('should not save correctly with invalid type', function(done) {
		var hero = new Hero({
			name: "Nope",
			subtitle: "Nope",
			type: "NOPE_WRONG_OHGOD",
			isRanged: true
		});

		hero.save(function(err) {
			(err).should.have.property('message', 'Validation failed');
			done();
		});
	});
});
