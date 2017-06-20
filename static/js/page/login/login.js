'use strict';

$(function(){

	var Login = function() {
		this.param = {};

		this.init();
	};
	Login.prototype = {

		init: function() {
			var self = this;

			$('#submit').click(function() {
				self.login();
			});
			$('html').keydown(function(event) {
				event.keyCode===13 && $('#submit').click();
			});
		},
		getParam: function() {
			this.param = {};
			this.param.name = $('#name input').val();
			this.param.password = $('#password input').val();
		},
		checkParam: function() {
			$('.error').text('').hide();
			if (!this.param.name) {
				$('#name .error').text('请输入用户名！').show();
				return false;
			}
			if (!this.param.password) {
				$('#password .error').text('请输入密码！').show();
				return false;
			}
			return true;
		},
		login: function() {
			var self = this;
			self.getParam();
			if (self.checkParam()) {
				$.post('/request/login/login', self.param, function(result) {
					if (result.success === 1) {
						location.href = result.url || '/home';
					} else {
						$('#error .error').text('用户名或密码错误！').show();
					}
				});
			}
		}

	};

	
	var login = new Login();
	
});