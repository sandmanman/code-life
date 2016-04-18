# CSS Note

#### Less rem
```css
/* 定义一个变量和一个mixin */
@baseFontSize: 75; /* 基于视觉稿横屏尺寸/100得出的基准font-size (这里是750px)*/
.px2rem(@name, @px){
  @{name}: @px / @baseFontSize * 1rem;
}
/* 使用示例 */
.container {
  .px2rem(height, 240);
}
```

===

#### 高消耗属性

```css
box-shadows

border-radius

transparency

transforms

filters /* 性能杀手 */
```

===

#### 换行

**强制换行**

```css
word-break: break-all; /* 只对英文起作用，以字母作为换行依据 */
word-wrap: break-word; /* 只对英文起作用，以单词作为换行依据 */
white-space: pre-wrap; /* 只对中文起作用，强制换行 */
```

**禁止换行**
```css
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis; /* 超出的内容以...来表示 */
```

===

#### 清除IE10 input默认×
```css
input:-ms-clear{
  display:none;
}
```

===

#### 字体设置
```css
/* 声明 WebFont */
@font-face {
  font-family: 'pinghei';
  src: url('../font/pinghei.eot');
  src:
    url('../font/pinghei.eot?#font-spider') format('embedded-opentype'),
    url('../font/pinghei.woff') format('woff'),
    url('../font/pinghei.ttf') format('truetype'),
    url('../font/pinghei.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}
/* 使用指定字体 */
.demo {
  font-family: 'pinghei';
}
```
* 单独设置字体
```css
h1 { font-family: Arial, serif; } /* 系统字体 */
.fontsloaded h1 { font-family:  'MySpecialFont', serif; } /* 自定义字体 */
```

```html
<link href="font.css" onload="document.body.className+=' fontsloaded';" rel="stylesheet" type="text/css" >
```

===

#### 行高设置
```css
/* http://www.zhangxinxu.com/wordpress/2016/03/css-layout-base-20px */
/*
  希望页面基本文字所占据的高度是20px
  默认字号14px
  20/14≈1.4285714285714286
  **在CSS中，行高计算的时候，一定不要向下四舍五入**
*/
body {
  font-size: 14px;
  line-height: 1.42858;
}
```
