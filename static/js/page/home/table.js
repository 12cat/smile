'use strict';

$(function() {

	var Table = function() {
		this.param = {};

		this.init();
	};
	Table.prototype = {

		init: function() {
			var self = this;

			$('#logout').click(function() {
				rifle.action({
				'type': 'post',
				'url': '/request/login/logout',
				'param': '',
				'cache': false,
				'urlFlag': false,
				'callback': function(result) {
					if (result.success === 1) {
						location.href = '/login';
					} else {
						alert('退出登录失败！');
					}
				}
			});
			});
			$('#query').click(function() {
				self.getData();
			});
			self.getData();
		},
		getParam: function() {
			this.param = {
				'race': $('#race').val(),
				'type': $('#type').val(),
				'armor': $('#armor').val(),
				'position': $('#position').val()
			};
		},
		getData: function() {
			var self = this;
			self.getParam();
			rifle.action({
				'type': 'get',
				'url': '/request/home/tableData',
				'param': self.param,
				'cache': true,
				'urlFlag': true,
				'callback': function(result) {
					switch (result.success) {
						case 0 :
							location.reload();
							break;
						case 1 :
							$('#text').text('read is success !');
							self.data2view(result.data);
							break;
						default:
							$('#text').text('read is error !');
					}
				}
			});
		},
		data2view: function(data) {
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
	};

	var table = new Table();
});