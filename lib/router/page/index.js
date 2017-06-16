'use strict';

var Request = function() {
	this.app ;
};
Request.prototype = {

	init: function(app) {
		this.app = app;
		this.get();			// get Page
		this.urlParam();	// get url param
		this.next1();		// next demo
		this.next2();
	},
	get: function() {
		this.app.get('/request/request/get', function(req, res) {
			// res.write('<h1>Node.js</h1>');
			// res.end('<p>Hello Node</p>');
			res.type('text/plain');
			res.end('The time is '+ new Date().toString());
		});
	},
	urlParam: function() {
		this.app.get('/request/request/param/:name/:age', function(req, res) {
			var __name = req.params.name;
			var __age = req.params.age;
			res.type('text/plain');
			res.send('The name is '+ __name +', The age is '+ __age);
		});
	},
	next1: function() {
		this.app.get('/request/request/next', function(req, res, next) {
			console.log('next demo 1:');
			next();
		});
	},
	next2: function() {
		this.app.get('/request/request/next', function(req, res) {
			res.type('text/plain');
			res.send('next demo 2:');
		});
	}
}
module.exports = new Request();