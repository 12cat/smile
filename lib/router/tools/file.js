'use strict';

var DataFile = function() {
	this.async = require('async');
	this.fs = require('fs');
};
DataFile.prototype = {

	readFile: function(path, callback) {
		var self = this;
		self.async.parallel(
			[
				function(callback) {
					self.fs.readFile(path, 'utf-8', function(err, data) {
						if (err) {
							callback(null, 'error：'+ err);
						} else {
							callback(null, data);
						}
					});
				}
			],
			function(err, results) {
				callback(err, results);
			}
		);
	},
	writeFile: function(path, data, callback) {
		var self = this;
		self.async.parallel(
			[
				function(callback) {
					self.fs.writeFile(path, data, 'utf-8', function(err, data) {
						if (err) {
							callback(null, 'error: '+ err);
						} else {
							callback(null, data);
						}
					});
				}
			],
			function(err, results) {
				callback(err, results);
			}
		);
	}
};
module.exports = new DataFile();