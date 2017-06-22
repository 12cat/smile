'use strict';

/**
 * 数据请求过滤：
 * 		@ type 	请求类型get/post等
 * 		@ url 		请求路径 
 * 		@ param	参数
 *		@ cache 	缓存
 *		@ urlFlag 	请求过滤是否包含参数
 *		@ callback 回调函数
 **/
var Rifle = function() {
	this.bodycount = {
		'key': {
			'clip': false,		// 请求锁
			'result': {},		// 最后一次请求结果
			'actionNum': 0,		// 意向请求次数
			'launchNum': 0		// 实际请求次数
		}
	};
};
Rifle.prototype = {
	action: function(option) {			// 行动
		// 请求缓存是否包含参数
		var key = option.urlFlag ? option.url+JSON.stringify(option.param) : option.url;
		// 定位目标
		!this.bodycount[key] && (this.bodycount[key]={'clip':false,'result':null,'actionNum':0,'launchNum':0});
		this.bodycount[key].actionNum++;
		// 是否有效目标
		if (this.bodycount[key].clip) {
			return ;
		}
		// 是否启用缓存
		if (option.cache && this.bodycount[key].result) {
			option.callback(this.bodycount[key].result);
		} else {
			this.bodycount[key].clip = true;
			this.bodycount[key].launchNum++;
			this.launch(key, this.bodycount[key], option);
		}
	},
	launch: function(key, unit, option) {	// 射击
		$.ajax({
			type: option.type,
			url: option.url,
			data: option.param,
			beforeSend: function(XMLHttpRequest) {
				console.info('beforeSend: '+ key);
			},
			success: function(result, textStatus) {
				unit.result = result;
				option.callback(result);
			},
			complete: function(XMLHttpRequest, textStatus) {
				unit.clip = false;
				console.info('complete: '+ key);
			},
			error: function(err) {
				console.error(err);
			}
		});
	},
	showBodycount: function() {			// 显示
		return this.bodycount;
	}
};
var rifle = new Rifle();