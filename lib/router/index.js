'use strict';

exports.router = function(app) {

	require('./login/login').init(app);		// login

	require('./interceptor').init(app);	// interceptor

	require('./default').init(app);		// default
};