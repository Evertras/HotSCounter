module.exports = function(app) {
	console.log('Hero routes loaded');
	app.get('/hero/', function (req, res) {
		res.send('yep');
	});
};
