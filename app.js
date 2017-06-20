'use strict';

var express = require('express');
var log4js = require('log4js');

var app = express();

log4js.configure('config4log.json');
log4js.getLogger();

app.set('views', __dirname +'/static/view');	// path
app.set('port', process.env.PORT || 5000);		// port number
app.set('view engine', 'pug');					// html type

app.use(express.static(__dirname));
app.use(require('body-parser')());				// body
app.use(require('cookie-parser')());			// cookie
app.use(require('express-session')({			// session
	'secret': '12cat',
	'cookie': {'maxAge': 30*60*1000}
}));

require('./lib/router').router(app);			// router

app.listen(app.get('port'), function() {		// listen
    console.info('WELL COME TO：localhost:'+ app.get('port'));
});