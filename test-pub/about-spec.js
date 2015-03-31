var baseUrl = require('./baseUrl.conf.js')();

describe('about page', function() {
	it ('should list after clicking About', function() {
		browser.get(baseUrl);

		var navElements = element(by.css(".nav"));
		var aboutNav = navElements.all(by.css('li')).last();

		expect(aboutNav.getText()).toContain("About");

		aboutNav.click();

		expect(element.all(by.css(".blockquote")).count() > 0);
	});
});
