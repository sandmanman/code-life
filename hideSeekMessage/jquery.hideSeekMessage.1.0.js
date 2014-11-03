/*
 * jQuery hideSeekMessage - jQuery Plugin
 * 参考网络代码修改
 * Version: 1.0 (11/03/2014)
 * Requires: jQuery v1.4+
 * 用法：
   $.tipMessage(提示语, 图标类型, 消失时间,zIndex,回调); 
   jQuery.tipMessage = function (message, typeIcon, hideTime, zIndex, callback) 
 */

//浏览器版本
var browser = {};
var ua = navigator.userAgent.toLowerCase();
var browserStr;
    (browserStr = ua.match(/msie ([\d]+)/)) ? browser.ie = browserStr[1] :
    (browserStr = ua.match(/firefox\/([\d]+)/)) ? browser.firefox = browserStr[1] :
    (browserStr = ua.match(/chrome\/([\d]+)/)) ? browser.chrome = browserStr[1] :
    (browserStr = ua.match(/opera.([\d]+)/)) ? browser.opera = browserStr[1] :
    (browserStr = ua.match(/version\/([\d]+).*safari/)) ? browser.safari = browserStr[1] : 0;
var isPad = navigator.userAgent.match(/iPad|iPhone|iPod|Android/i) != null;

//tip消息提示
(function($) {
    jQuery.hideSeekMessage = function(msg, type, time, zIndex, callback) {
        if (typeof hideSeekMessageTimeoutId !== "number") {
            hideSeekMessageTimeoutId = 0
        }
        if (typeof time !== "number") {
            time = 2000
        }
        if (typeof zIndex !== "number" || zIndex == 0) {
            zIndex = 65500
        }
        var $doc = $(document);
        var $win = $(window);
        var $hideSeekMessage = $("#hideSeekMessage");
        var _typeTag = "";
        var _newTop = 0;
        var _newLeft = 0;
        var _width = 0;
        var _NumCount = 1;
        var _mask = "";

        if ($hideSeekMessage.length <= 0) {
            $("body").append("<div id='hideSeekMessage' class='hide-seek-message'></div>");
            $hideSeekMessage = $('#hideSeekMessage');
        } else {
            if (browser.ie == 6 || browser.ie == 7) {
                $hideSeekMessage.css({
                    width: "99%"
                });
            } else {
                $hideSeekMessage.css({
                    width: "auto"
                });
            }
        }
        $hideSeekMessage.css({
            opacity: 0,
            zIndex: zIndex
        });
        
        //清除旧的延时事件
        clearTimeout(hideSeekMessageTimeoutId);

        if (type == 1) {
            _typeTag = "normal";
        } else if (type == 2) {
            _typeTag = "success";
        } else if (type == 3){
            _typeTag = "fail";
        } else {
            _typeTag = "wraning";
        }
        if (browser.ie == 6) {
            _mask = "<iframe frameborder='0' scrolling='no' class='ie6-mask'></iframe>";
        }
        $hideSeekMessage.html(_mask + '<div class="hideseek-message-container"><i class="msg-icon-' + _typeTag + '"></i><div class="hideseek-message-content" id="hideseek-message-content">' + msg + '</div></div>').show();


        //计算top,left 值
        function _calculate() {
            _width = $("#hideseek-message-content").width(); //计算tip宽度
            if ($doc.scrollTop() + $win.height() > $doc.height()) {
                _newTop = $doc.height() - $win.height() / 2 - 40;
            } else {
                _newTop = $doc.scrollTop() + $win.height() / 2 - 40;
            }

            if ($win.width() >= $doc.width()) {
                _newLeft = $doc.width() / 2 - _width / 2;
            } else {
                if ($win.width() <= _width) {
                    if ($doc.scrollLeft() + $win.width() + (_width - $win.width()) / 2 > $doc.width()) {
                        _newLeft = $doc.width() - _width;
                    } else {
                        _newLeft = $doc.scrollLeft() + $win.width() / 2 - _width / 2;
                    }
                } else {
                    //alert(1);
                    _newLeft = $doc.scrollLeft() + $win.width() / 2 - _width / 2;

                }
            }
            if (_newLeft < 0) {
                _newLeft = 0;
            }
        }

        //计算top,left 值
        _calculate();
        $hideSeekMessage.css({
            top     : _newTop,
            left    : _newLeft,
            width   : _width,
            opacity : 10
        });


        //重置
        function _reSet() {
            _calculate(); //从新计算top,left 值
            $hideSeekMessage.css({
                top   : _newTop,
                left  : _newLeft,
                width : _width
            });
        }


        //调整大小
        function _resize() {
            if (_NumCount % 2 == 0) { //解决IE6下scrollLeft值问题
                _reSet();
                _NumCount = 1;
            } else {
                ++_NumCount;
            }
        }
        if (!isPad) { //pad设备不支持浮动
            $win.bind({
                "scroll": _reSet,
                "resize": _resize
            });
        }
        hideSeekMessageTimeoutId = setTimeout(function() {
            $hideSeekMessage.remove();
            if (typeof callback == "function") {
                callback.call();
            }
        }, time);
    };
})(jQuery);