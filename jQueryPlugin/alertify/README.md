# alertify插件

## 基本使用示例：
## alert
 
```javascript
alertifyReset();
alertify.alert("这是alert提示");
```
## confirm

```jacascript
alertifyReset();
alertify.confirm("这是confirm提示", function (e) {
    if (e) {
	  alertify.success("你点击了确认");
    } else {
	  alertify.error("你点击了取消");
    }
});
```

## prompt

```javascript
alertifyReset();
alertify.prompt("这是prompt提示", function (e, str) {
    if (e) {
        alertify.success("你输入的是: " + str);
    } else {
        alertify.error("你点了取消");
    }
}, "默认值");
```

## info Log

```javascript
alertifyReset();
alertify.log("自动消失提示");
```

## success Log

```javascript
alertifyReset();
alertify.success("成功提示");
```

## error Log

```javascript
alertifyReset();
alertify.error("失败提示");
```


## warning Log

```javascript
alertifyReset();
alertify.warning("警告提示");
```


## plusTip  
```javascript
alertifyReset();
alertify.plusTip(this,"+10086");
```

----------------------------------------------------------------------
## 高级使用示例：

## 右上角显示关闭 X
```javascript
alertifyReset();//一定要写上这个，用来重置自定义属性
alertify.set({
    closeButtonShow: true
});
alertify.alert("右上角显示关闭 X");
```

## 自定义按钮文字
```javascript
alertifyReset();//一定要写上这个，用来重置自定义属性
alertify.set({
    labels: {
        ok: "同意",
        cancel: "拒绝"
    }
});
alertify.confirm("自定义按钮文字", function (e) {
    if (e) {
        alertify.success("你点了同意");
    }else{
        alertify.log("你点了拒绝");
    }
});
```

## 按钮聚焦
```javascript
alertifyReset();//一定要写上这个，用来重置自定义属性
alertify.set({ 
    buttonFocus: "ok" 
});
alertify.confirm("按钮聚焦在确定");
```

## 点击Log才会消失
```javascript
alertifyReset();//一定要写上这个，用来重置自定义属性
alertify.log("点我才会消失", "", 0);
```