'use strict';

var Interceptor = function() {
	this.app ;
};
Interceptor.prototype = {

	init: function(app) {
		this.app = app;
		this.data();	// 拦截器 拦截数据请求
		this.page();	// 拦截器 拦截页面请求
	},
	data: function() {
		var self = this;
		self.app.all('/request/*', function(req, res, next) {
			if (req.session.token && req.session.token===req.cookies.token) {
				next();
			} else {
				console.warn('token is lost !');
				res.send({'success':0, 'param':req.url});
			}
		});
	},
	page: function() {
		var self = this;
		self.app.get('/*', function(req, res, next) {
			if (req.session.token && req.session.token===req.cookies.token) {
				next();
			} else {
				console.warn('token is lost !');
				res.redirect('/?url='+ req.url);
			}
		});
	},
	default: function() {
		this.app.get('/*', function(req, res) {
			res.redirect('/home');
		});
	}
};

module.exports = new Interceptor();