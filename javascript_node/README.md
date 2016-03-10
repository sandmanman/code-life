#javaScript Note

####浏览器版本判断
```javascript
var ua = navigator.userAgent.toLowerCase();
var ie67 = ua.indexOf('msie 6.0')!=-1 || ua.indexOf('msie 7.0')!=-1;
var ie8 = ua.indexOf('msie 8.0')!=-1;
var isMobile = ua.indexOf('mobile')!=-1;
var mac = ua.indexOf('mac os x')!=-1
```

####移动端浏览器判断Demo
```javascript
var isIDevicePhone = (/iphone|ipod/gi).test(navigator.platform);
var isIDeviceIpad = !isIDevicePhone && (/ipad/gi).test(navigator.platform);
var isIDevice = isIDevicePhone || isIDeviceIpad;
var isAndroid = !isIDevice && (/android/gi).test(navigator.userAgent);
var isIEMobile = !isIDevice && !isAndroid && (/IEMobile/gi).test(navigator.userAgent);
var redirect = function() {
	if (isIDevice) {
		var msg = isIDeviceIpad ? "检测到您正在使用iPad, 是否直接前往AppStore下载?" : "检测到您正在使用iPhone, 是否直接前往AppStore下载?";
		if (confirm(msg)) {
			window.location = "http://3g.163.com/links/3615";
			return;
		};
		//if the device is ipad, break redirect.
		if (isIDeviceIpad) {
			return;
		}
	} else if (isAndroid) {
		if (confirm("检测到您正在使用Android 手机，是否直接下载程序安装包？")) {
			window.location = 'http://3g.163.com/links/4304';
			return;
		}
		//TODO if the device is android pad, break redirect
		//
	} else if (isIEMobile) {
		//continue
		window.location = 'http://3g.163.com/links/3614';
		return;
	} else {
		//break
		return;
	}
	window.location = 'http://3g.163.com/newsapp';
};
//调用
redirect();
```

####移动端浏览器判断
```javascript
function mobile_device_detect(url) {
	var thisOS = navigator.platform;
	var os = new Array("iPhone", "iPod", "iPad", "android", "Nokia", "SymbianOS", "Symbian", "Windows Phone", "Phone", "Linux armv71", "MAUI", "UNTRUSTED/1.0", "Windows CE", "BlackBerry", "IEMobile");
	for (var i = 0; i < os.length; i++) {
		if (thisOS.match(os[i])) {
			window.location = url;
		}

	}

	//因为相当部分的手机系统不知道信息,这里是做临时性特殊辨认
	if (navigator.platform.indexOf('iPad') != -1) {
		window.location = url;
	}
	//做这一部分是因为Android手机的内核也是Linux
	//但是navigator.platform显示信息不尽相同情况繁多,因此从浏览器下手，即用navigator.appVersion信息做判断
	var check = navigator.appVersion;
	if (check.match(/linux/i)) {
		//X11是UC浏览器的平台 ，如果有其他特殊浏览器也可以附加上条件
		if (check.match(/mobile/i) || check.match(/X11/i)) {
			window.location = url;
		}
	}

	//类in_array函数
	Array.prototype.in_array = function(e) {
		for (i = 0; i < this.length; i++) {
			if (this[i] == e)
				return true;
		}
		return false;
	}
}
mobile_device_detect("http://v.qq.com/ph5/fashion/zt/2016vsswimspecial/index.html");
```
