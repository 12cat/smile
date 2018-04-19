'use strict';

$(function() {

// 退出
$('#logout').click(function() {
	logout();
});

function logout() {
	$.post('/request/login/logout', {}, function(result) {
		if (result.success === 0) {
			console.log('退出登录失败！');
		} else {
			location.reload();
		}
	});
}
	
});