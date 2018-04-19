'use strict';

$(function() {

var param = {};

$('#submit').click(function() {
	register();
});
$('html').keydown(function(event) {
	event.keyCode===13 && $('#submit').click();
});
$('#login').click(function() {
	location.href = '/login';
});

function getParam() {
	param = {};
	param.username = $('#username input').val();
	param.password = $('#password input').val();
}

function checkParam() {
	$('.error').text('').hide();
	if (!param.username) {
		$('#username .error').text('请输入用户名！').show();
		return false;
	}
	if (!param.password) {
		$('#password .error').text('请输入用户密码！').show();
		return false;
	}
	if (!$('#confirm input').val()) {
		$('#confirm .error').text('请输入确认密码！').show();
		return false;
	}
	if ($('#confirm input').val() !== param.password) {
		$('#password .error').text('密码输入不一致！').show();
		return false;
	}
	return true;
}

function register() {
	getParam();
	if (checkParam()) {
		$.post('/request/login/register', param, function(result) {
			if (result.success === 0) {
				$('#error .error').text(result.data).show();
			} else {
				location.href = '/login';
			}
		});
	}
}

});