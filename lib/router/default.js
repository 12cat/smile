'use strict';

var Default = function() {
	this.app ;
};
Default.prototype = {

	init: function(app) {
		this.app = app;
		this.default();		// default page
	},
	default: function() {
		this.app.get('/*', function(req, res) {
			res.redirect('/index');
		});
	}
};
module.exports = new Default();