'use strict';

$(function(){

	var Register = function() {
		this.param = {};

		this.init();
	};
	Register.prototype = {

		init: function() {
			var self = this;

			$('#submit').click(function() {
				self.register();
			});
			$('html').keydown(function(event) {
				event.keyCode===13 && $('#submit').click();
			});
			$('#login').click(function() {
				location.href = '/login';
			});
		},
		getParam: function() {
			this.param = {};
			this.param.username = $('#username input').val();
			this.param.password = $('#password input').val();
		},
		checkParam: function() {
			$('.error').text('').hide();
			if (!this.param.username) {
				$('#username .error').text('请输入用户名！').show();
				return false;
			}
			if (!this.param.password) {
				$('#password .error').text('请输入用户密码！').show();
				return false;
			}
			if (!$('#confirm input').val()) {
				$('#confirm .error').text('请输入确认密码！').show();
				return false;
			}
			if ($('#confirm input').val() !== this.param.password) {
				$('#password .error').text('密码输入不一致！').show();
				return false;
			}
			return true;
		},
		register: function() {
			var self = this;
			self.getParam();
			if (self.checkParam()) {
				$.post('/request/login/register', self.param, function(result) {
					if (result.success === 0) {
						$('#error .error').text(result.data).show();
					} else {
						location.href = '/login';
					}
				});
			}
		}

	};

	var login = new Register();
});