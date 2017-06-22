'use strict';

var Table = function() {
	this.app ;
	this.file = require('../tools/file');
};
Table.prototype = {

	init: function(app) {
		this.app = app;
		this.page();		// get Page
		this.tableData();	// get tableData
	},
	page: function() {
		this.app.get('/table', function(req, res) {
			res.render('home/table');
		});
	},
	tableData: function() {
		var self = this;
		this.app.get('/request/home/tableData', function(req, res) {
			var param = req.query;
			self.file.readFile('lib/data/table.json', function(err, results) {
				if (err) {
					console.error(err);
					return ;
				} else {
					return res.send({'success':1, 'data':self.distData(results[0], param)});
				}
			});
		});
	},
	distData: function(data, param) {
		var data = JSON.parse(data);
		var __data = [];
		for (var i=0; i<data.length; i++) {
			if (
				(param.race && param.race!==data[i].race) ||
				(param.type && param.type!==data[i].type) ||
				(param.armor && param.armor!==data[i].armor) ||
				(param.position && param.position!==data[i].position)
			) {
				continue;
			}
			__data.push(data[i]);
		}
		return __data;
	}
}
module.exports = new Table();