Code Life
===
#### 项目规范
- [CodeGuide](http://alloyteam.github.io/CodeGuide/)

===

#### 百度前端技术体系
- [EFE](http://efe.baidu.com/)

#### 前端开发指南
- [Front-End-Develop-Guide](https://github.com/icepy/Front-End-Develop-Guide)

===

#### 博客
- [张鑫旭](http://www.zhangxinxu.com/wordpress/)
- [阮一峰](http://www.ruanyifeng.com/blog)
- [fouber前端文章](https://github.com/fouber/blog)
- [白色橡树](http://www.cnblogs.com/PeunZhang/)
- [CSS森林](http://blog.cssforest.org/)
- [前端观察](https://www.qianduan.net/)
- [W3Cplus](http://www.w3cplus.com/)

===

### 教程
- [菜鸟教程](http://www.runoob.com/)
- [Vue.js1.0视频教程](https://laravist.com/series/vue-js-1-0-in-action-series)
- [VueJs资源聚合](https://github.com/jsfront/src/blob/master/vuejs.md)

===

### javaScript
- [Sea.js](http://island205.github.io/HelloSea.js/index.html)
- [VUE.JS](http://cn.vuejs.org/)

- [javascript常用代码收集](https://github.com/jsfront/src/blob/master/js.md)
- [JavaScript 经典实例收集整理](https://segmentfault.com/a/1190000002559158)

===

#### 框架库
- <a href="http://www.foundcss.com/">Foundation</a>
- <a href="http://getuikit.com/">UI KIT</a>
- <a href="https://github.com/aralejs/aralejs.org/">aralejs</a>

===

### HTML5模版
- [html5-boilerplate](https://github.com/h5bp/html5-boilerplate)

===

#### 移动端
- [Frozen UI](http://frozenui.github.io/)
- [GMU](https://github.com/fex-team/GMU)
- [SUI-Mobile](https://github.com/sdc-alibaba/SUI-Mobile)

- [vux](https://github.com/airyland/vux) vue weui

- [lib-flexible移动端自适应方案(rem)](https://github.com/amfe/lib-flexible)
- [移动前端开发经验指南](https://github.com/doyoe/trip)
- [iOS与Android平台上问题列表](https://github.com/AlloyTeam/Mars/tree/master/issues)

===

#### CSS
- [常用代码](https://github.com/jsfront/src/blob/master/css.md)
- [CSS3动画](http://www.minimamente.com/example/magic_animations/)
- [动画库](http://h5bp.github.io/Effeckt.css/)

#### CSS在线工具
- <a href="http://linxz.github.io/tianyizone/">CSS小工具集合</a>
- <a href="http://www.cnblogs.com/lhb25/archive/2012/09/27/10-css3-online-generator-tools.html">CSS3 Maker</a>
- <a href="http://border- radius.com/">Border Radius</a>
- <a href="http://css3generator.com/">CSS3 Generator</a>
- <a href="http://westciv.com/tools/gradients/">CSS3 Tool</a>
- <a href="http://cssanimate.com/">CSS3 Keyframes Animation Generator</a>
- <a href="http://matthewlein.com/ceaser/">Ceaser -  CSS Easing Animation Tool -  Matthew Lein</a>
- <a href="https://jeremyckahn.github.io/stylie/">Stylie</a>
- <a href="http://labs.pufen.net/my_collection/hex_change.html">CSS背景颜色属性值转换 v3</a>

===

#### 有用的
- <a href="https://github.com/leeethe/fex- edu">FEX学院</a>
- <a href="http://f2er.club/">醉牛前端</a>
- <a href="http://fredsarmento.me/frontend- tools/">frontend- tools</a>
- <a href="http://alloyteam.github.io/AlloyDesigner/">AlloyDesigner</a> 对比设计图

===

#### javaScript资源

**自适应轮播**
- [Glide](https://github.com/jedrzejchalubek/Glide.js)
- [Flickity](https://github.com/metafizzy/flickity)
- [Owl Carousel](https://github.com/smashingboxes/OwlCarousel2)
- [Swiper](https://github.com/nolimits4web/Swiper)
- [slick](https://github.com/kenwheeler/slick/)


- [circle statitic](https://github.com/pguso/jquery-plugin-circliful)环形进度条
- [perfect scrollbar](https://github.com/noraesae/perfect-scrollbar)滚动条
- [detect-element-resize](https://github.com/sdecima/javascript-detect-element-resize)监听元素的变化,如高度

-[isMobile](https://github.com/kaimallea/isMobile)

- [Picturefill](https://github.com/scottjehl/picturefill)图片自适应

- [资源大全中文版](https://github.com/jobbole/awesome-javascript-cn)


#### Status codes
The API is designed to return different status codes according to context and action. In this way if a request results in an error the caller is able to get insight into what went wrong, e.g. status code 400 Bad Request is returned if a required attribute is missing from the request. The following list gives an overview of how the API functions generally behave.

API request types:

- **GET** requests access one or more resources and return the result as JSON
- **POST** requests return 201 Created if the resource is successfully created and return the newly created resource as JSON
- **GET, PUT** and DELETE return 200 Ok if the resource is accessed, modified or deleted successfully, the (modified) result is returned as JSON
- **DELETE** requests are designed to be idempotent, meaning a request a resource still returns 200 Ok even it was deleted before or is not available. The reasoning behind it is the user is not really interested if the resource existed before or not.

The following list shows the possible return codes for API requests.

Return values:

- **200 Ok** - The GET, PUT or DELETE request was successful, the resource(s) itself is returned as JSON
- **201 Created** - The POST request was successful and the resource is returned as JSON
- **400 Bad Request** - A required attribute of the API request is missing, e.g. the title of an issue is not given
- **401 Unauthorized** - The user is not authenticated, a valid user token is necessary, see above
- **403 Forbidden** - The request is not allowed, e.g. the user is not allowed to delete a project
- **404 Not Found** - A resource could not be accessed, e.g. an ID for a resource could not be found
- **405 Method Not Allowed** - The request is not supported
- **409 Conflict** - A conflicting resource already exists, e.g. creating a project with a name that already exists
- **500 Server Error** - While handling the request something went wrong on the server side
