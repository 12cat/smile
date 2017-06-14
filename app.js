var express = require('express');

var app = express();

app.set('port', process.env.PORT || 5000);  // Port number
app.set('views', __dirname +'/view');       // path

app.use(express.static(__dirname));

app.get('/', function(req, res) {
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello Node</p>');
});

app.listen(app.get('port'), function() {    // listen
    console.log(' url：localhost:'+ app.get('port'));
    console.log('stop：Ctrl + c');
});