#JavaScript Note

####前辈总结规则
```javascript
不要使用new Number()、new Boolean()、new String()创建包装对象；

用parseInt()或parseFloat()来转换任意类型到number；

用String()来转换任意类型到string，或者直接调用某个对象的toString()方法；

通常不必把任意类型转换为boolean再判断，因为可以直接写if (myVar) {...}；

typeof操作符可以判断出number、boolean、string、function和undefined；

判断Array要使用Array.isArray(arr)；

判断null请使用myVar === null；

判断某个全局变量是否存在用typeof window.myVar === 'undefined'；

函数内部判断某个变量是否存在用typeof myVar === 'undefined'。
```

####浏览器版本判断
```javascript
var ua = navigator.userAgent.toLowerCase();
var ie67 = ua.indexOf('msie 6.0')!=-1 || ua.indexOf('msie 7.0')!=-1;
var ie8 = ua.indexOf('msie 8.0')!=-1;
var isMobile = ua.indexOf('mobile')!=-1;
var mac = ua.indexOf('mac os x')!=-1
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

####HTML5上传图片并预览
```javascript
var
    fileInput = document.getElementById('test-image-file'),
    info = document.getElementById('test-file-info'),
    preview = document.getElementById('test-image-preview');
// 监听change事件:
fileInput.addEventListener('change', function () {
    // 清除背景图片:
    preview.style.backgroundImage = '';
    // 检查文件是否选择:
    if (!fileInput.value) {
        info.innerHTML = '没有选择文件';
        return;
    }
    // 获取File引用:
    var file = fileInput.files[0];
    // 获取File信息:
    info.innerHTML = '文件: ' + file.name + '<br>' +
                     '大小: ' + file.size + '<br>' +
                     '修改: ' + file.lastModifiedDate;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        alert('不是有效的图片文件!');
        return;
    }
    // 读取文件:
    var reader = new FileReader();
    reader.onload = function(e) {
        var
            data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'            
        preview.style.backgroundImage = 'url(' + data + ')';
    };
    // 以DataURL的形式读取文件:
    reader.readAsDataURL(file);
});
```

####javascript异步请求
```javascript
function success(text) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = text;
}
function fail(code) {
    var textarea = document.getElementById('test-response-text');
    textarea.value = 'Error code: ' + code;
}
// 新建XMLHttpRequest对象
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject('Microsoft.XMLHTTP');
}

request.onreadystatechange = function() { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
	    // 判断响应结果:
	    if (request.status === 200) {
		    // 成功，通过responseText拿到响应的文本:
		    return success(request.responseText);
	    } else {
		    // 失败，根据响应码判断失败原因:
		    return fail(request.status);
	    }
	} else {
	     // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();
```

#### 数组去重函数
```javascript
Array.prototype.delrep = function(fun) {
    if(!fun) {
        fun = function(d) {return d;};
    }
    var newArr = [];
    this.sort(function(a, b) {
        return fun(a) > fun(b) ? -1 : 1;
    });
    newArr.push(this[0]);
    this.forEach(function(d) {
        if(fun(d) != fun(newArr[0])) {
            newArr.unshift(d);
        }
    });
    return newArr;
};

// 对于基本类型数组
// 来源https://segmentfault.com/a/1190000000437452
[1,2,3,4,5,5,6,6,5].delrep(); //输出[1, 2, 3, 4, 5, 6]

// 对于对象数组
var data = [
    {
        name: "aaa",
        value: 123
    },
    {
        name: "bbb",
        value: 234
    },
    {
        name: "aaa",
        value: 789
    }
];
console.log(data2.delrep(function(d) {return d.name;}));
//输出
[
	{
	    name: "bbb",
	    value: 234
	},
	{
	    name: "aaa",
	    value: 789
	}
];
```


#### 验证码 倒计时60秒
```javascript
var time = 60;
function countDown(which){

  if(time == 0 ){
    $(which).text("重新获取");
    $(which).removeAttribute("disabled");
    time = 60;
  }else {
    $(which).text("等待"+time+"秒");
    $(which).attr("disabled",true);
    time--;
    setTimeout(function(){
      countDown(which)
    },
    1000)
  }
}
```


#### 字符串剪裁
```javascript
/**
 * 在拼接正则表达式字符串时，消除原字符串中特殊字符对正则表达式的干扰
 * author:meizz
 * version: 2010/12/16
 * param               {String}        str     被正则表达式字符串保护编码的字符串
 * return              {String}                被保护处理过后的字符串
*/
function escapeReg(str) {
        return str.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), "\\\x241");
}  

/**
 * 删除URL字符串中指定的 Query
 * author:meizz
 * version:2010/12/16
 * param               {String}        url     URL字符串
 * param               {String}        key     被删除的Query名
 * return              {String}                被删除指定 query 后的URL字符串
*/

function delUrlQuery(url, key) {
        key = escapeReg(key);
        var reg = new RegExp("((\\?)("+ key +"=[^&]*&)+(?!"+ key +
  "=))|(((\\?|&)"+ key +"=[^&]*)+$)|(&"+ key +"=[^&]*)", "g");
        return url.replace(reg, "\x241")
}  

// 应用实例
var str = "http://www.xxx.com/?pn=0";   // 删除指定字符 pn=0
delUrlQuery(str, "pn");
```


#### 判断浏览器向上/下滚动
```javascript
var topf = 0;
window.onscroll = function() {
	tops = document.documentElement.scrollTop || document.body.scrollTop < topf ? alert("页面正在向上滚") : topf = document.documentElement.scrollTop || document.body.scrollTop;
}
```
