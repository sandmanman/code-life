#codeLife

前端代码摘抄

###项目规范
<a href="https://github.com/ecomfe/spec" target="_blank">项目规范</a>

###浏览器版本判断
```javascript
var ua = navigator.userAgent.toLowerCase();
var ie67 = ua.indexOf('msie 6.0')!=-1 || ua.indexOf('msie 7.0')!=-1;
var ie8 = ua.indexOf('msie 8.0')!=-1;
var isMobile = ua.indexOf('mobile')!=-1;
var mac = ua.indexOf('mac os x')!=-1
```

###移动端浏览器判断
```javascript
var isIDevicePhone = (/iphone|ipod/gi).test(navigator.platform);
var isIDeviceIpad = !isIDevicePhone && (/ipad/gi).test(navigator.platform);
var isIDevice = isIDevicePhone || isIDeviceIpad;
var isAndroid = !isIDevice && (/android/gi).test(navigator.userAgent);
var isIEMobile = !isIDevice && !isAndroid && (/IEMobile/gi).test(navigator.userAgent);
var redirect = function() {
	if(isIDevice){
		var msg = isIDeviceIpad ? "检测到您正在使用iPad, 是否直接前往AppStore下载?" : "检测到您正在使用iPhone, 是否直接前往AppStore下载?";
		if (confirm(msg)){
			window.location = "http://3g.163.com/links/3615";
			return;
		};
		//if the device is ipad, break redirect.
		if(isIDeviceIpad){
			return;
		}
	}else if(isAndroid) {
		if (confirm("检测到您正在使用Android 手机，是否直接下载程序安装包？")) {
			window.location = 'http://3g.163.com/links/4304';
			return;
		}
		//TODO if the device is android pad, break redirect
		//
	}else if(isIEMobile){
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

-------------------------------------------------------------------------------

###CSS Rem
```css
html { font-size: 62.5%; } 
body { font-size: 14px; font-size: 1.4rem; } /* =14px 兼容低版本IE */
h1   { font-size: 24px; font-size: 2.4rem; } /* =24px 兼容低版本IE */
```

###CSS高消耗属性

box-shadows,
border-radius,
transparency,
transforms,
CSS filters（性能杀手）
