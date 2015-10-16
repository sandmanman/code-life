
/* ====================================
 * jQuery Validation
 * 验证扩展
 * 02.28.2015
 * ====================================
*/

(function(factory) {
	if (typeof define === "function" && define.amd) {
		define(["jquery", "./jquery.validate"], factory);
	} else {
		factory(jQuery);
	}
}(function($) {

	(function() {

		function stripHtml(value) {
			// remove html tags and space chars
			return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
				// remove punctuation
				.replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
		}

		$.validator.addMethod("maxWords", function(value, element, params) {
			return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length <= params;
		}, $.validator.format("Please enter {0} words or less."));

		$.validator.addMethod("minWords", function(value, element, params) {
			return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
		}, $.validator.format("Please enter at least {0} words."));

		$.validator.addMethod("rangeWords", function(value, element, params) {
			var valueStripped = stripHtml(value),
				regex = /\b\w+\b/g;
			return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1];
		}, $.validator.format("Please enter between {0} and {1} words."));

	}());

	// 指定文件类型
	$.validator.addMethod("accept", function(value, element, param) {
		// Split mime on commas in case we have multiple types we can accept
		var typeParam = typeof param === "string" ? param.replace(/\s/g, "").replace(/,/g, "|") : "image/*",
			optionalValue = this.optional(element),
			i, file;

		// Element is optional
		if (optionalValue) {
			return optionalValue;
		}

		if ($(element).attr("type") === "file") {
			// If we are using a wildcard, make it regex friendly
			typeParam = typeParam.replace(/\*/g, ".*");

			// Check if the element has a FileList before checking each file
			if (element.files && element.files.length) {
				for (i = 0; i < element.files.length; i++) {
					file = element.files[i];

					// Grab the mimetype from the loaded file, verify it matches
					if (!file.type.match(new RegExp(".?(" + typeParam + ")$", "i"))) {
						return false;
					}
				}
			}
		}

		// Either return true because we've validated each file, or because the
		// browser does not support element.files and the FileList feature
		return true;
	}, $.validator.format("请输入指定类型的文件"));


	/* ====================================
	 * 验证中文扩展 (源码来自网络)
	 * 02.16.2015
	 * ====================================
	 */

	// 邮政编码
	$.validator.addMethod("zipCode", function(value, element) {
		var tel = /^[0-9]{6}$/;
		return this.optional(element) || (tel.test(value));
	}, "邮政编码格式错误");

	//18位身份证号码
	$.validator.addMethod("chinaid", function(value, element) {
		var city = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江 ",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北 ",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏 ",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外 "
		};
		var tip = "";
		var pass = true;

		if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
			tip = "身份证号格式错误!";
			pass = false;
		} else if (!city[value.substr(0, 2)]) {
			tip = "地址编码错误!";
			pass = false;
		} else {
			//18位身份证需要验证最后一位校验位
			if (value.length == 18) {
				value = value.split('');
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
				//校验位
				var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
				var sum = 0;
				var ai = 0;
				var wi = 0;
				for (var i = 0; i < 17; i++) {
					ai = value[i];
					wi = factor[i];
					sum += ai * wi;
				}
				var last = parity[sum % 11];
				if (parity[sum % 11] != value[17]) {
					tip = "校验位错误!";
					pass = false;
				}
			}
		}
		return pass;
	}, "身份证号码格式错误");

	//只可输入中文
	$.validator.addMethod("chinese", function(value, element) {
		var chinese = /^[\u4E00-\u9FA5]+$/;
		return this.optional(element) || (chinese.test(value));
	}, "只可输入中文");

	//字母数字汉字组合
	$.validator.addMethod("letterNumberChinese", function(value, element) {
		var letterNumberChinese = /^[0-9a-zA-Z\u4E00-\u9FA5]+$/;
		return this.optional(element) || (letterNumberChinese.test(value));
	}, "只可输入中文、英文或数字");

	// 字符最小长度验证（一个中文字符长度为2）
	$.validator.addMethod("stringMinLength", function(value, element, param) {
		var length = value.length;
		for (var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 127) {
				length++;
			}
		}
		return this.optional(element) || (length >= param);
	}, $.validator.format("长度不能小于{0}!"));

	// 字符最大长度验证（一个中文字符长度为2）
	$.validator.addMethod("stringMaxLength", function(value, element, param) {
		var length = value.length;
		for (var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 127) {
				length++;
			}
		}
		return this.optional(element) || (length <= param);
	}, "长度不能大于{0}!");

	// 特殊符号
	$.validator.addMethod("string", function(value, element) {
		return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
	}, "不允许包含特殊符号!");

	// 手机号码
	$.validator.addMethod("mobile", function(value, element) {
		var length = value.length;
		return this.optional(element) || (length == 11 && /^1[3587]\d{9}$/.test(value));
	}, "手机号码格式错误!");

	// 电话号码
	$.validator.addMethod("phone", function(value, element) {
		var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
		return this.optional(element) || (tel.test(value));
	}, "电话号码格式错误!");

	// 以特定字符串开头
	$.validator.addMethod("begin", function(value, element, param) {
		var begin = new RegExp("^" + param);
		return this.optional(element) || (begin.test(value));
	}, "必须以 {0} 开头!");

	// 验证两次输入值是否不相同
	$.validator.addMethod("notEqualTo", function(value, element, param) {
		return value != $(param).val();
	}, "两次输入不能相同!");

	// 验证值不允许与特定值等于
	$.validator.addMethod("notEqual", function(value, element, param) {
		return value != param;
	}, "输入值不允许为{0}!");

	// 验证值必须大于特定值(不能等于)
	$.validator.addMethod("gt", function(value, element, param) {
		return value > param;
	}, "输入值必须大于{0}!");

	// 验证值小数位数不能超过两位
	$.validator.addMethod("decimal", function(value, element) {
		var decimal = /^-?\d+(\.\d{1,2})?$/;
		return this.optional(element) || (decimal.test(value));
	}, "小数位数不能超过两位!");

	// 中文/字母/数字/下划线组合 CLNU=chinese letter number underline  
	$.validator.addMethod("CLNUString", function(value, element) {
		return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
	}, "只能包括中文、英文字母、数字和下划线");

	// 中文字两个字节
	$.validator.addMethod("byteRangeLength", function(value, element, param) {
		var length = value.length;
		for (var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 127) {
				length++;
			}
		}
		return this.optional(element) || (length >= param[0] && length <= param[1]);
	}, "输入的值在3-15个字节之间(一个中文字算2个字节)");


}));



/* ====================================
 * 源码英文提示语，重置为中文
 * 02.16.2015
 * ====================================
 */
jQuery.extend(jQuery.validator.messages, {
	required: "不能为空",
	remote: "请修正该字段",
	email: "请输入正确格式的邮箱",
	url: "请输入正确格式的网址",
	date: "请输入正确格式的日期",
	dateISO: "请输入正确格式的日期 (ISO).", //例如：2009-06-23，1998/01/22。只验证格式，不验证有效性。
	number: "请输入合法的数字",
	digits: "只能输入整数",
	creditcard: "请输入合法的信用卡号",
	equalTo: "请再次输入相同的值",
	accept: "请上传指定文件类型",
	maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
	minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
	rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
	range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
	max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
	min: jQuery.validator.format("请输入一个最小为 {0} 的值")
});