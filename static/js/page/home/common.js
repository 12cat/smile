'use strict';

$(function() {

	var Top = function() {

		this.init();
	};
	Top.prototype = {
		init: function() {
			var self = this;

			// 退出
			$('#logout').click(function() {
				self.logout();
			});
		},
		logout: function() {
			$.post('/request/login/logout', {}, function(result) {
				if (result.success === 0) {
					console.log('退出登录失败！');
				} else {
					location.href = '/login';
				}
			});
		}
	};

	new Top();
});