'use strict';

module.exports = function(app) {
	// demo页
	app.get('/demo1', function(req, res) {
		res.render('pug/demo1');
	});
	// 属性
	app.get('/demo2', function(req, res) {
		res.render('pug/demo2', {title: '属性', url:'www.aaa.com'});
	});
};