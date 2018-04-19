'use strict';

$(function() {

var param = {};

$('#submit').click(function() {
	login();
});
$('html').keydown(function(event) {
	event.keyCode===13 && $('#submit').click();
});
$('#register').click(function() {
	location.href = '/register';
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
		$('#password .error').text('请输入密码！').show();
		return false;
	}
	return true;
}

function login() {
	getParam();
	if (checkParam()) {
		$.post('/request/login/login', param, function(result) {
			if (result.success === 1) {
				location.href = result.url || '/home';
			} else {
				$('#error .error').text('用户名或密码错误！').show();
			}
		});
	}
}
	
});