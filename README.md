#Code Life

###项目规范
<a href="http://alloyteam.github.io/CodeGuide/" target="_blank">项目规范参考</a>

<a href="https://github.com/ecomfe/spec/blob/master/directory.md" target="_blank">目录规范参考</a>

###jQuery插件开发模板

```javascript
// 这个分号的作用是防止和其他jquery插件合并时，别人不规范的jquery插件忘记使用分号结束
// 影响到我们当前的插件，导致无法运行的问题。 
;(function ( $, window, document, undefined ) {

	// undefined作为形参的目的是因为在es3中undefined是可以被修改的
	// 比如我们可以声明var undefined = 123,这样就影响到了undefined值的判断，幸运的是在es5中,undefined不能被修改了。
	// window和document本身是全局变量，在这个地方作为形参的目的是因为js执行是从里到外查找变量的（作用域），把它们作为局部变量传进来，就避免了去外层查找，提高了效率。

	// 声明默认属性对象
	var pluginName = "defaultPluginName",
	    defaults = {
	    propertyName: "value"
	};

	// 构造函数
	function Plugin ( element, options ) {
	    this.element = element;
	    // 将默认属性对象和传递的参数对象合并到第一个空对象中
	    this.settings = $.extend( {}, defaults, options );
	    this._defaults = defaults;
	    this._name = pluginName;
	    this.init();
	}
	
	// 为了避免和原型对象Plugin.prototype的冲突，这地方采用继承原型对象的方法
	$.extend(Plugin.prototype, {
	    init: function () {
	                // 初始化，由于继承自Plugin原型，
	                // 你可以在这里直接使用this.element或者this.settings
	            console.log("xD");
	    },
	    yourOtherFunction: function () {
	            // some logic
	    }
	});
	
	// 对构造函数的一个轻量级封装，
	// 防止产生多个实例
	$.fn[ pluginName ] = function ( options ) {
	    this.each(function() {
	            if ( !$.data( this, "plugin_" + pluginName ) ) {
	                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
	            }
	    });
	
	    // 方便链式调用
	    return this;
	};

})( jQuery, window, document );
```


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


==========================================================================

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

###CSS换行

*强制换行

```css
word-break: break-all; /* 只对英文起作用，以字母作为换行依据 */
word-wrap: break-word; /* 只对英文起作用，以单词作为换行依据 */
white-space: pre-wrap; /* 只对中文起作用，强制换行 */
```

*禁止换行
```css
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis; /* 超出的内容以...来表示 */
```

###CSS3 Media Queries
```css
//For Small Desktop
@media (min-width: 980px) and (max-width: 1150px) {}
```

```css
//Tablet (Portrait) Design for a width of 768px
@media (min-width: 768px) and (max-width: 979px) {}
```

```css
//Mobile (Portrait) Design for a width of 320px
@media only screen and (max-width: 767px)  {}
```

```css
//Mobile (Landscape) Design for a width of 480px
@media only screen and (min-width: 480px) and (max-width: 767px) {}
```
