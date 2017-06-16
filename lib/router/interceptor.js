'use strict';

var Interceptor = function() {
	this.user = JSON.parse(require('../data/user.json'));
	this.app ;
};
Interceptor.prototype = {

	init: function(app) {
		this.app = app;
		this.interface();	// 拦截器 拦截调用接口
		this.page();		// 拦截器 拦截页面
	},
	interface: function() {
		var self = this;
		self.app.all('/request/*', function(req, res, next) {
			var token = req.cookies.token;
			self.getUser(function(user) {
				if (token === user.token) {
					next();
				} else {
					console.error('token is lost !');
					res.send({'success':0, 'param':req.url});
				}
			});
		});
	},
	page: function() {
		var self = this;
		self.app.get('/*', function(req, res, next) {
			var token = req.cookies.token;
			self.getUser(function(user) {
				if (token === user.token) {
					next();
				} else {
					console.error('token is lost !');
					res.redirect('/?url='+ req.url);
				}
			});
		});
	},
	getUser: function(callback) {
		this.dataFile.readFile('./data/login.txt', function(err, results) {
			if (results[0]) {
				callback(JSON.parse(results[0]));
			} else {
				callback({});
			}
		});
	}
};
module.exports = new Interceptor();