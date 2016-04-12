# Javascript-移动端Web

#### 移动端浏览器判断
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


#### 移动Web开发，检测浏览器是否支持position:fixed
```javascript
// 来源https://github.com/maxzhang/maxzhang.github.com/issues/7
var div = document.createElement('div');
div.style.cssText = 'display:none;position:fixed;z-index:100;';
body.appendChild(div);
console.log(window.getComputedStyle(div).position != 'fixed');

// 对于不支持fixed的浏览器，window.getComputedStyle(div).position计算出来的值会是absolute
// 在这段代码的基础上，可以封装一个公共函数，并将已知的不支持fixed浏览器直接过滤掉。
function isSupportFixed() {
  var userAgent = window.navigator.userAgent,
      ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/),
      ios5below = ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) < 5),
      operaMini = /Opera Mini/i.test(userAgent),
      body = document.body,
      div, isFixed;

  div = document.createElement('div');
  div.style.cssText = 'display:none;position:fixed;z-index:100;';
  body.appendChild(div);
  isFixed = window.getComputedStyle(div).position != 'fixed';
  body.removeChild(div);
  div = null;

  return !!(isFixed || ios5below || operaMini);
}
```

#### :hover伪类在移动端二次点击的问题
```javascript
// 在PC端中,默认链接颜色是红色， hover的时候，链接颜色是蓝色，点击一次跳转
// 但是在移动端上中，第一次点击，链接颜色变蓝（也就是移动端上点击会触发伪类效果），再点一次才会跳转

// 在body上绑定一个空的touchstart事件即可
document.body.addEventListener(‘touchstart’, function(){ });
```
