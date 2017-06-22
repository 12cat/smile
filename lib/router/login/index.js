'use strict';

var Login = function() {
	this.app ;
	this.file = require('../tools/file.js');
};
Login.prototype = {

	init: function(app) {
		this.app = app;
		this.loginPage();		// 登陆页
		this.login();			// 登录接口
		this.logout();			// 登出接口
		this.registerPage();	// 注册页
		this.register();		// 注册
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
				'username': req.body.username,
				'password': req.body.password
			};
			var url = req.headers.referer.split('?url=')[1] || '/home';
			self.getUserList(function(userList) {
				for (var i=0; i<userList.length; i++) {
					if (userList[i].username===param.username && userList[i].password===param.password) {
						var token = 
						req.session.token = new Date().getTime()+'';
						req.session.user =  userList[i];
						res.cookie('token', req.session.token, {maxAge: 30*60*1000});
						return res.send({'success':1, 'url': url});
					}
				}
				res.send({'success':0});
			});
		});
	},
	logout: function() {
		this.app.post('/request/login/logout', function(req, res) {
			res.clearCookie('token');
			res.send({'success':1});
		});
	},
	registerPage: function() {
		this.app.get('/register', function(req, res) {
			res.render('login/register');
		});
	},
	checkUser: function(username, callback) {
		this.getUserList(function(userList) {
			for (var i=0; i<userList.length; i++) {
				if (username === userList[i].username) {
					callback(false, userList);
					return ;
				}
			}
			callback(true, userList);
		});
	},
	register: function() {
		var self = this;
		self.app.post('/request/login/register', function(req, res) {
			var user = {
				'username': req.body.username,
				'password': req.body.password
			};
			self.checkUser(user.username, function(flag, userList) {
				if (flag) {
					userList.push(user);
					self.addUser(JSON.stringify(userList), function(results) {
						res.send(results);
					});
				} else {
					res.send({'success':0, 'data':'用户名重复！'});
				}
			});
			
		});
	},
	getUserList: function(callback) {
		this.file.readFile('lib/data/user.json', function(err, results) {
			if (err) {
				console.error(err);
				return ;
			} else {
				callback(JSON.parse(results) || []);
			}
		});
	},
	addUser: function(userListStr, callback) {
		this.file.writeFile('lib/data/user.json', userListStr, function(err) {
			if (err) {
				callback({'success':0, 'data':'用户信息写入失败！'});
			} else {
				callback({'success':1, 'data':'添加用户成功！'});
			}
		});
	}
};
module.exports = new Login();