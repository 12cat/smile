'use strict';

var Login = function() {
	this.app ;
	this.file = require('../tools/file.js');
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
			if (req.session.token && req.session.token===req.cookies.token) {
				res.redirect('/home');
			} else {
				res.render('login/login');
			}
		});
	},
	login: function() {
		var self = this;
		self.app.post('/request/login/login', function(req, res) {
			var param = {
				'name': req.body.name,
				'password': req.body.password
			};
			var url = req.headers.referer.split('?url=')[1] || '/home';
			self.file.readFile('lib/data/user.json', function(err, results) {
				if (err) {
					console.error(err);
					return ;
				} else {
					var userList = JSON.parse(results[0]) || [];
					for (var i=0; i<userList.length; i++) {
						if (userList[i].username===param.name && userList[i].password===param.password) {
							var token = 
							req.session.token = new Date().getTime()+'';
							req.session.user =  userList[i];
							res.cookie('token', req.session.token, {maxAge: 30*60*1000});
							return res.send({'success':1, 'url': url});
						}
					}
					res.send({'success':0});
				}
			});
		});
	},
	logout: function() {
		this.app.post('/request/login/logout', function(req, res) {
			res.clearCookie('token');
			res.send({'success':1});
		});
	}
};
module.exports = new Login();