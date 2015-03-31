exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['hero-list-spec.js', 'about-spec.js'],
	capabilities: {
		browserName: 'phantomJS'
	}
};
