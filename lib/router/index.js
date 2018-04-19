'use strict';

var interData = require('./interceptor').interData;
var interPage = require('./interceptor').interPage;
var interOther = require('./interceptor').interOther;

function router(app) {

	require('./login')(app);		// login

	interData(app);			// 拦截器 拦截数据请求
	interPage(app);			// 拦截器 拦截页面请求

	require('./pug')(app);			// pug
	require('./home')(app);			// home
	require('./home/table')(app);	// table

	interOther(app);			// other

};

exports.router = router;