#JavaScript Package

#### 类型判断
```javascript
function type(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
}
```

#### 获取对象构造函数名称
```javascript
function getConstructorName(obj){
	return ( obj===undefined || obj===null ) ? obj: ( obj.constructor && obj.constructor.toString().match(/function\s*([^(]*)/)[1] );
}
// 使用
getConstructorName(new Date()); // "Date"
```

#### window onload
```javascript
function addLoadEvent(func) {
	var oldonload = window.onload;
	if ( typeof window.onload != 'function' ) {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		};
	}
}
```

#### insertAfter
```javascript
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if ( parent.lastChild == targetElement ) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}
```

#### 获取下一个元素节点
```javascript
function getNextElement(node) {
	if ( node.nodeType == 1 ) {
		return node;
	}
	if ( node.nextSibling ) {
		return getNextElement(node.nextSibling);
	}
	return null;
}
```

#### addClass
```javascript
function addClass(element, value) {
	if ( !element.className ) {
		element.classNmae = value;
	} else {
		newClassName = element.classNmae;
		newClassName += '';
		newClassName += value;
		element.classNmae = newClassName;
	}
}
```
