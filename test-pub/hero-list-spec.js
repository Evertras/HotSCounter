var baseUrl = require('./baseUrl.conf.js')();

describe('hero list page', function() {
	it ('should list all heroes', function() {
		browser.get(baseUrl);

		var heroes = element.all(by.repeater('hero in heroChunk'));

		expect(heroes.count()).toEqual(35);
	});
});
