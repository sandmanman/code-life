#jQuery Ajax Demo

```javascript
var jqRequestUrl = "AjaxHandler.ashx";
//1、 加载并执行一个 JS 文件
$.ajax({
  type: "GET",
  url: "js/jqLoadJs.js",
  dataType: "script"
});


//2、装载一个 HTML 网页最新版本
$.ajax({
  url: "test.html",
  cache: false, //没有缓存的说
  success: function(html) {
    //alert(html);
    $("#spanGetHtml").css("display", "block");
    $("#spanGetHtml").css("color", "red");
    $("#spanGetHtml").append(html);
  }
});


//3、获取并解析一个xml文件(从服务端获取xml)
$.ajax({
  type: 'GET',
  dataType: 'xml', //这里可以不写，但千万别写text或者html
  url: jqRequestUrl + "?action=jquerGetXmlRequest",
  success: function(xml) {
    //正确解析服务端的xml文件
    $(xml).find("profile").each(function(i) {
      var name = $(this).children("userName").text(); //取对象文本
      var location = $(this).children("location").text();
      alert("Xml at SERVER is gotten by CLIENT:" + name + " is living in " + location);
    });
  },
  error: function(xml) {
    alert('An error happend while loading XML document ');
  }
});


//4、发送 XML 数据至服务器(客户端发送xml到服务端)
var xmlDocument = "<profile>" +
" <userName>jeff wong</userName>" +
" <location>beijing</location>" +
"</profile>";
$.ajax({
  url: jqRequestUrl + "?action=jqueryXmlRequest",
  processData: false, //设置 processData 选项为 false，防止自动转换数据格式。
  //type: "xml",
  cache: false,
  type: "xml",
  data: xmlDocument,
  success: function(html) {
    alert(html); //弹出提示
    $("#spanResult").css("display", "block");
    $("#spanResult").css("color", "red");
    $("#spanResult").html(html); //给当前dom的一个span元素赋值
  },
  error: function(oXmlHttpReq, textStatus, errorThrown) {
    alert("jquery ajax xml request failed");
    $("#spanResult").css("display", "block");
    $("#spanResult").css("color", "red");
    $("#spanResult").html("jquery ajax xml request failed"); //提示出错
  }
});


//5、同步加载数据。发送请求时锁住浏览器。需要锁定用户交互操作时使用同步方式。
var html = $.ajax({
  //没有type 默认为GET方式
  url: jqRequestUrl + "?action=syncRequest",
  async: false
}).responseText;
alert(html);


//6、显式get测试
$.ajax({
  type: "GET",
  url: jqRequestUrl + "?action=jquery&userName=" + $("#txtUserName").val(),
  cache: false,
  success: function(html) {
    // alert(html); //弹出提示
    $("#spanResult").css("display", "block");
    $("#spanResult").css("color", "red");
    $("#spanResult").html(html); //给当前dom的一个span元素赋值
  },
  error: function(oXmlHttpReq, textStatus, errorThrown) {
    alert("jquery ajax request failed");
    $("#spanResult").css("display", "block");
    $("#spanResult").css("color", "red");
    $("#spanResult").html("jquery ajax request failed"); //提示出错
  }
});


//7、显式POST测试
$.ajax({
  type: "POST",
  url: jqRequestUrl,
  data: "action=jquerySaveData&userName=jeffwong&location=beijing",
  success: function(html) {
    alert(html);
  }
});
```
