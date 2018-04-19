'use strict';

module.exports = function(app) {
	app.get('/demo1', function(req, res) {
		res.render('pug/demo1');
	});
	app.get('/demo2', function(req, res) {
		res.render('pug/demo2', {title: '属性', url:'www.aaa.com'});
	});
	app.get('/test', function(req, res) {
		res.render('pug/test', {title: '属性', url:'www.aaa.com'});
	});
};