'use strict';

var Login = function() {
	this.dataFile = require('../tools/dataFile');
	this.app ;
};
Login.prototype = {

	init: function(app) {
		this.app = app;
		this.loginPage();	// 登陆页
		this.login();		// 登录接口
		this.logout();		// 登出接口
	},
	loginPage: function() {
		this.app.get('/', function(req, res) {
			res.render('login/index');
		});
	},
	login: function() {
		var self = this;
		self.app.post('/request/signIn/login', function(req, res) {
			var param = {
				'name': req.body.name,
				'password': req.body.password
			};
			var __url = req.headers.referer.split('?url=')[1] || '/index';
			self.dataFile.readFile('./data/user.txt', function(err, results) {
				var _admin = self.distUser(results[0], param);
				if (_admin) {
					res.cookie('token', _admin.token, {maxAge: 30*60*1000});
					self.dataFile.writeFile('./data/login.txt', JSON.stringify(_admin), function(err, results) {
						return res.send({'success':1, 'url': __url});
					});
				} else {
					res.send({'success':0});
				}
			});
		});
	},
	logout: function() {
		this.app.post('/request/signIn/logout', function(req, res) {
			res.clearCookie('token');
			res.send({'success':1});
		});
	},
	distUser: function(data, param) {
		var data = JSON.parse(data);
		for (var i=0; i<data.length; i++) {
			if (data[i].name===param.name && data[i].password===param.password) {
				return {'userName':data[i].name, 'token':(new Date().getTime()+'')};
			}
		}
		return false;
	}
};
module.exports = new Login();