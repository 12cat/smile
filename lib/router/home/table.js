'use strict';

var readFile = require('../tools/file.js').readFile;

module.exports = function(app) {
	page(app);		// get Page
	tableData(app);	// get tableData
};

function page(app) {
	app.get('/table', function(req, res) {
		res.render('home/table');
	});
}

function tableData(app) {
	app.get('/request/home/tableData', function(req, res) {
		var param = req.query;
		readFile('lib/data/table.json', function(err, results) {
			if (err) {
				console.error(err);
				return ;
			} else {
				return res.send({'success':1, 'data':distData(results, param)});
			}
		});
	});
}

function distData(data, param) {
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
