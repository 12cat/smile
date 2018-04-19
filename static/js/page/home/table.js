'use strict';

$(function() {

var param = {};

$('#query').click(function() {
	getData();
});
getData();

function getParam() {
	param = {
		race: $('#race').val(),
		type: $('#type').val(),
		armor: $('#armor').val(),
		position: $('#position').val()
	};
}

function getData() {
	getParam();
	rifle.action({
		type: 'get',
		url: '/request/home/tableData',
		param: param,
		cache: true,
		urlFlag: true,
		callback: function(result) {
			switch (result.success) {
				case 0 :
					location.reload();
					break;
				case 1 :
					$('#text').text('read is success !');
					data2view(result.data);
					break;
				default:
					$('#text').text('read is error !');
			}
		}
	});
}

function data2view(data) {
	var __html = '';
	for (var i=0; i<data.length; i++) {
		__html += '<tr>'
					+'<td>'+ data[i].unit +'</td>'
					+'<td>'+ data[i].race +'</td>'
					+'<td>'+ data[i].type +'</td>'
					+'<td>'+ data[i].armor +'</td>'
					+'<td>'+ data[i].position +'</td>'
				+'</tr>';
	}
	$('#dataTable').html(__html);
	$('#num').text(data.length);
}

});