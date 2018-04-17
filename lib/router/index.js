'use strict';

var interceptor = require('./interceptor');

exports.router = function(app) {

	require('./login').init(app);			// login

	interceptor.init(app);					// interceptor

	require('./pug')(app);					// pug
	require('./home').init(app);			// home
	require('./home/table').init(app);		// table

	interceptor.default();					// default

};