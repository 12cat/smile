'use strict';

var readFile = require('../tools/file.js').readFile;
var writeFile = require('../tools/file.js').writeFile;

module.exports = function(app) {
	loginPage(app);		// 登陆页
	login(app);			// 登录接口
	logout(app);		// 登出接口
	registerPage(app);	// 注册页
	register(app);		// 注册
};

function loginPage(app) {
	app.get('/', function(req, res) {
		if (req.session.token && req.session.token===req.cookies.token) {
			res.redirect('/pug');
		} else {
			res.render('login/login');
		}
	});
}

function login(app) {
	app.post('/request/login/login', function(req, res) {
		var param = {
			'username': req.body.username,
			'password': req.body.password
		};
		var url = req.headers.referer.split('?url=')[1] || '/home';
		getUserList(function(userList) {
			for (var i=0; i<userList.length; i++) {
				if (userList[i].username===param.username && userList[i].password===param.password) {
					var token = 
					req.session.token = new Date().getTime()+'';
					req.session.user =  userList[i];
					res.cookie('token', req.session.token, {maxAge: 300*60*1000});
					return res.send({'success':1, 'url': url});
				}
			}
			res.send({'success':0});
		});
	});
}

function logout(app) {
	app.post('/request/login/logout', function(req, res) {
		res.clearCookie('token');
		res.send({'success':1});
	});
}

function registerPage(app) {
	app.get('/register', function(req, res) {
		res.render('login/register');
	});
}

function checkUser(username, callback) {
	getUserList(function(userList) {
		for (var i=0; i<userList.length; i++) {
			if (username === userList[i].username) {
				callback(false, userList);
				return ;
			}
		}
		callback(true, userList);
	});
}

function register(app) {
	app.post('/request/login/register', function(req, res) {
		var user = {
			'username': req.body.username,
			'password': req.body.password
		};
		checkUser(user.username, function(flag, userList) {
			if (flag) {
				userList.push(user);
				addUser(JSON.stringify(userList), function(results) {
					res.send(results);
				});
			} else {
				res.send({'success':0, 'data':'用户名重复！'});
			}
		});
		
	});
}

function getUserList(callback) {
	readFile('lib/data/user.json', function(err, results) {
		if (err) {
			console.error(err);
			return ;
		} else {
			callback(JSON.parse(results) || []);
		}
	});
}

function addUser(userListStr, callback) {
	writeFile('lib/data/user.json', userListStr, function(err) {
		if (err) {
			callback({'success':0, 'data':'用户信息写入失败！'});
		} else {
			callback({'success':1, 'data':'添加用户成功！'});
		}
	});
}