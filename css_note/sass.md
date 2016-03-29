# SASS

#### Rem
```css
/* px2rem function */
@function px2rem($px){
  $rem : 37.5px;
  @return ($px/$rem) + rem;
}
/* 使用 */
margin: px2rem(100px);
/*
  37.5怎么计算的
  如视觉稿以iphone6为设计尺寸，iphone6的屏幕宽度为375px
  rem = window.innerWidth  / 10
*/
```

===

#### CSS Media query设置html font-size
```css
@media (min-device-width : 375px) and
       (max-device-width : 667px) and
       (-webkit-min-device-pixel-ratio : 2) {
        html{ font-size: 37.5px; }
}
```

===


#### javascript来动态设置设置html font-size
```javascript
//document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
document.addEventListener('DOMContentLoaded', function(e) {
  document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
}, false);
```
