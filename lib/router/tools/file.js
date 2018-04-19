'use strict';

var fs = require('fs');

exports.readFile = function(path, callback) {
	fs.readFile(path, 'utf-8', function(err, data) {
		callback(err, data);
	});
};

exports.writeFile = function(path, data, callback) {
	fs.writeFile(path, data, 'utf-8', function(err) {
		callback(err);
	});
};