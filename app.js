'use strict';

var express = require('express');

var app = express();

app.set('port', process.env.PORT || 5000);	// port number
app.set('views', __dirname +'/views');      // path
app.set('view engine', 'pug');              // file type

app.use(express.static(__dirname));
app.use(require('body-parser')());          // req.body.name
app.use(require('cookie-parser')());        // res.cookie

require('./lib/router').router(app);		// router

app.listen(app.get('port'), function() {    // listen
    console.log('url：localhost:'+ app.get('port'));
});