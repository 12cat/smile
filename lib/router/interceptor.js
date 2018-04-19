'use strict';

// 拦截器 拦截数据请求
function interData(app) {
	app.all('/request/*', function(req, res, next) {
		if (req.session.token && req.session.token===req.cookies.token) {
			next();
		} else {
			console.warn('token is lost !');
			res.send({'success':0, 'param':req.url});
		}
	});
}

// 拦截器 拦截页面请求
function interPage(app) {
	app.get('/*', function(req, res, next) {
		if (req.session.token && req.session.token===req.cookies.token) {
			next();
		} else {
			console.warn('token is lost !');
			res.redirect('/?url='+ req.url);
		}
	});
}

// other
function interOther(app) {
	app.get('/*', function(req, res) {
		res.redirect('/home');
	});
}

exports.interData = interData;
exports.interPage = interPage;
exports.interOther = interOther;