'use strict';

var Pug = function() {
	this.app ;
};
Pug.prototype = {

	init: function(app) {
		this.app = app;
		this.demoPage();	// demo页
	},
	demoPage: function() {
		this.app.get('/pug', function(req, res) {
			res.render('pug/demo');
		});
	}
};
module.exports = new Pug();