;var util = function(doc, undefined) {
	'use strict';
	var addListener = null,
		removeListener = null,
		hasClass,
		addClass,
		removeClass,
		ajax,
		getElementsByClassName,
		isPhone,
		hidePhone,
		query,
		querys,
		remove,
		append,
		prepend,
		toggleClass,
		getObjectURL,
		is,
		deepCopy,
		getById,
		createDom,
		getJSON,
		getAdaptHeight,
		findParent,
		converImgTobase64,
		getStrAfterFilter;

	if (typeof window.addEventListener === 'function') {
		addListener = function(el, type, fn) {
			el.addEventListener(type, fn, false);
		};
		removeListener = function(el, type, fn) {
			el.removeEventListener(type, fn, false);
		};
	} else if (typeof doc.attachEvent === 'function') {  //'IE'
		addListener = function(el, type, fn) {
			el.attachEvent('on'+type, fn);
		};
		removeListener = function(el, type, fn) {
			el.detachEvent('on'+type, fn);
		};
	} else {
		addListener = function(el, type, fn) {
			el['on'+type] = fn;
		};
		removeListener = function(el, type, fn) {
			el['on'+type] = null;
		};
	}

	hasClass = function(ele, cls) {
		var className, reg;
		reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		className = ele.getAttribute("class") ? ele.className : "";
		return reg.test(className);
	};

	addClass = function(ele, cls) {
		if (!ele || hasClass(ele, cls)) {
			return (ele.className ? ele.className : "");
		}
		if (ele.className) {
			return (ele.className += ' ' + cls);
		} else {
			return (ele.className = cls);
		}
	};

	removeClass = function(ele, cls) {
		if (!ele) {
			return ele.className ? ele.className : "";
		}
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		return (ele.className = ele.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g, ""));
	}

	function callback(xhr, options) {
		if (xhr.readyState === 4) {
			var result = xhr.responseText,
				status = xhr.status;
			if (typeof options.always === "function") {
				options.always(result);
			}
			if (status === 200) {
				if (typeof options.success === "function") {
					options.success(result);
				}
			}
			else if (status === 400) {
				if (typeof options.badRequest === "function") {
					options.badRequest(xhr)
				} else {
					alert("请求非法");
				}
			}
			else if (status === 401) {
				if (typeof options.unauthorized === "function") {
					options.unauthorized(xhr);
				} else {
					alert("权限不足");
				}
			}
			else if (status === 403) {
				if (typeof options.forbidden === "function") {
					options.forbidden(xhr);
				} else {
					alert("禁止访问");
				}
			}
			else if (status === 404) {
				if (typeof options.notFound === "function") {
					options.notFound(xhr);
				} else {
					alert("请求资源不存在");
				}
			}
			else if (status === 405) {
				if (typeof options.methodNotAllowed === "function") {
					options.methodNotAllowed(xhr);
				} else {
					alert("请求非法");
				}
			}
			else if (status === 500) {
				if (typeof options.internalServerError === "function") {
					options.internalServerError(xhr);
				} else {
					alert("服务器内部错误");
				}
			}
			else if (status === 503) {
				if (typeof options.serviceUnavailable === "function") {
					options.serviceUnavailable(xhr);
				} else {
					alert("操作过于频繁, 请稍后重试");
				}
			}
		}
	}

	ajax = function(options) {
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {	//for IE6
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xhr.onreadystatechange = function() {
			callback(xhr, {
				success			: 		options.success,
				always 			: 		options.always,
				unavailabled	: 		options.unavailabled
			});
		}
		xhr.open(options.type, options.url, options.async);
		if (options.type.toUpperCase() === "POST") {
			xhr.setRequestHeader("Content-type","application/json");
		}
		if (typeof options.header === "object")  {
			var header = options.header;
			for (var key in header) {
				if (header.hasOwnProperty(key)) {
					xhr.setRequestHeader(key, header[key]);
				}
			}
		}
		if (typeof options.data !== "undefined") {
			xhr.send(options.data);
		} else {
			xhr.send();
		}
		return xhr;
	}

	getElementsByClassName = function(tagName, className) {
		var result = [];
		var allTag = doc.getElementsByTagName(tagName);
		for (var i = 0, len_ = allTag.length; i < len_; i++) {
			if (hasClass(allTag[i], className)) {
				result.push(allTag[i]);
			}
		}
		return result;
	}

	isPhone = function (aPhone) {
		return RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);
    }

    hidePhone = function(number) {
    	return number.substr(0, 3)+"****"+number.substr(7, 4);
    }

    query = function(string, parentNode) {
    	if (parentNode) {
    		return parentNode.querySelector(string);
    	} else {
    		return doc.querySelector(string);
    	}
    }

    querys = function(string, parentNode) {
    	if (parentNode) {
    		return parentNode.querySelectorAll(string);
    	} else {
    		return doc.querySelectorAll(string);
    	}
    }

    remove = function(childNode) {
    	var parentNode = childNode.parentNode;
    	return parentNode.removeChild(childNode);
    }

    append = function(parentNode, childNode) {
    	if (typeof childNode === "string") {
    		var previousHTML = parentNode.innerHTML;
    		return parentNode.innerHTML = previousHTML + childNode;
    	} else {
    		return parentNode.appendChild(childNode);
    	}
    }

    prepend = function(parentNode, childNode) {
    	if (typeof childNode === "string") {
    		var previousHTML = parentNode.innerHTML;
    		return parentNode.innerHTML = childNode + previousHTML;
    	} else {
    		var reforeNode = parentNode.children[0];
    		parentNode.insertBefore(childNode, reforeNode);
    	}
    }

    toggleClass = function(ele, cls) {
    	if (hasClass(ele, cls)) {
    		return removeClass(ele, cls);
    	} else {
    		return addClass(ele, cls);
    	}
    }

    getObjectURL = function(file) {
    	var url = null;
	    if (window.createObjectURL !== undefined) { // basic
	        url = window.createObjectURL(file);
	    } else if (window.URL !== undefined) { // mozilla(firefox)
	        url = window.URL.createObjectURL(file);
	    } else if (window.webkitURL !== undefined) { // webkit or chrome
	        url = window.webkitURL.createObjectURL(file);
	    }
	    return url;
    }

    is = function(obj, type) {
    	var toString = Object.prototype.toString;
    	return (type === 'Null' && obj == null) ||
    		(type == "Undefined" && Object === undefined) ||
    		toString.call(obj).slice(8, -1) === type;
    }

    deepCopy = function(oldObj, newObj) {
    	for (var key in oldObj) {
	        var copy = oldObj[key];
	        if (oldObj === copy) continue; //如window.window === window，会陷入死循环，需要处理一下
	        if (is(copy, "Object")) {
	            newObj[key] = deepCopy(copy, newObj[key] || {});
	        } else if (is(copy, "Array")) {
	            newObj[key] = []
	            newObj[key] = deepCopy(copy, newObj[key] || []);
	        } else {
	            newObj[key] = copy;
	        }
	    }
	    return newObj;
    }

    getById = function(id) {
    	return doc.getElementById(id);
    }

    createDom = function(tagName) {
    	return document.createElement(tagName);
    }

    getJSON = function(json) {
    	if (typeof json === "string"&&json) {
    		json = JSON.parse(json)
    	}
    	return json
    }

    getAdaptHeight = function(currentDom, previousDom, currentExtra, previousExtra) {
    	var currentHeight = currentDom.getBoundingClientRect().height;
    	var previousHeight = previousDom.getBoundingClientRect().height;
    	if (currentExtra !== undefined) {
    		currentHeight += currentExtra;
    	}
    	if (previousExtra !== undefined) {
    		previousHeight += previousExtra;
    	}
    	return Math.max(currentHeight, previousHeight);
    }

    findParent = function(childNode, filter) {
    	var parentNode = childNode;
    	while (parentNode && (!filter(parentNode))) {
    		parentNode = parentNode.parentNode;
    	}
    	return parentNode;
    }

    converImgTobase64 = function(url, callback, outputFormat) {
    	var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
	        img = new Image;
	    img.crossOrigin = 'Anonymous';
	    img.onload = function(){
	        canvas.height = img.height;
	        canvas.width = img.width;
	        ctx.drawImage(img,0,0);
	        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	        callback.call(this, dataURL);
	        canvas = null;
	    };
	    img.src = url;
    }

    getStrAfterFilter = function(str) {
    	return str.replace(/<(.*)>(.*)<\/(.*)>|<(.*)\/>/g, "").replace(/\\/g,"").replace(/&/g, "");
    }

	return {
		addListener 			: 				addListener,
		removeListener 			: 				removeListener,
		hasClass 				: 				hasClass,
		addClass 				: 				addClass,
		removeClass 			: 				removeClass,
		ajax 					: 				ajax,
		getElementsByClassName 	: 				getElementsByClassName,
		isPhone 				: 				isPhone,
		hidePhone 				: 				hidePhone,
		query 					: 				query,
		querys 					: 				querys,
		remove 					: 				remove,
		append 					: 				append,
		prepend 				: 				prepend,
		toggleClass 			: 				toggleClass,
		getObjectURL 			: 				getObjectURL,
		is 						: 				is,
		deepCopy 				: 				deepCopy,
		getById 				: 				getById,
		createDom 				: 				createDom,
		getJSON 				: 				getJSON,
		getAdaptHeight 			: 				getAdaptHeight,
		findParent				: 				findParent,
		converImgTobase64		: 				converImgTobase64,
		getStrAfterFilter 		: 				getStrAfterFilter
	};
}(document);

Date.prototype.Format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
