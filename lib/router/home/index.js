'use strict';

var Home = function() {
	this.app ;
};
Home.prototype = {

	init: function(app) {
		this.app = app;
		this.page();		// get Page
	},
	page: function() {
		this.app.get('/home', function(req, res) {
			res.render('home/home');
		});
	}
}
module.exports = new Home();