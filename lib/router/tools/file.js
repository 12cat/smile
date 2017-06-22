'use strict';

var DataFile = function() {
	this.fs = require('fs');
};
DataFile.prototype = {

	readFile: function(path, callback) {
		this.fs.readFile(path, 'utf-8', function(err, data) {
			callback(err, data);
		});
	},
	writeFile: function(path, data, callback) {
		this.fs.writeFile(path, data, 'utf-8', function(err) {
			callback(err);
		});
	}
};
module.exports = new DataFile();