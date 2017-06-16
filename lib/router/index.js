'use strict';

exports.router = function(app) {

	var log4js = require('log4js');

	log4js.configure('log4js.json');
	app.logger = log4js.getLogger('logger');
	app.logger.setLevel('ALL');				// TRACE, DEBUG, INFO, WARN, ERROR, FATAL

	// require('./login/login').init(app);	// login

	// require('./interceptor').init(app);	// interceptor

	// require('./default').init(app);		// default

	require('./page').init(app);

	app.logger.trace('Entering cheese testing');
	app.logger.debug('Got cheese.');
	app.logger.info('Cheese is Gouda.');
	app.logger.warn('Cheese is quite smelly.');
	app.logger.error('Cheese is too ripe!');
	app.logger.fatal('Cheese was breeding ground for listeria.');

};