/*
 * jQuery hideSeekTip - jQuery Plugin
 * 参考网络代码修改
 * Version: 1.0 (11/03/2014)
 * Requires: jQuery v1.4+
 * 用法：
   $.hideSeekTip(提示语, 图标类型, 消失时间,zIndex,回调); 
   jQuery.hideSeekTip = function (msg, typeIcon, delaydelayTime, zIndex, callback) 
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

    //msg 提示文本
    //typeIcon 图标
    //delayTime 消失时间
    //zIndex 层级
    //callback 回调

    jQuery.hideSeekTip = function(msg, typeIcon, delayTime, zIndex, callback) {

        if (typeof hideSeekTipTimeoutId !== "number") {
            hideSeekTipTimeoutId = 0
        }
        if (typeof delayTime !== "number") {
            delayTime = 2000
        }
        if (typeof zIndex !== "number" || zIndex == 0) {
            zIndex = 65500
        }

        var $doc = $(document);
        var $win = $(window);
        var $hideSeekTip = $("#hideSeekTip");
        var iconTag = "";
        var modalTop = 0;
        var modalLeft = 0;
        var modalWidth = 0;
        var _NumCount = 1;
        var _mask = "";

        if ($hideSeekTip.length <= 0) {
            $("body").append("<div id='hideSeekTip' class='hide-seek-tip'></div>");
            $hideSeekTip = $('#hideSeekTip');
        } else {
            if (browser.ie == 6 || browser.ie == 7) {
                $hideSeekTip.css({
                    width: "99%"
                });
            } else {
                $hideSeekTip.css({
                    width: "auto"
                });
            }
        }
        $hideSeekTip.css({
            opacity: 0,
            zIndex: zIndex
        });

        //清除旧的延时事件
        clearTimeout(hideSeekTipTimeoutId);

        if (typeIcon == 1) {
            iconTag = "normal";
        } else if (typeIcon == 2) {
            iconTag = "success";
        } else if (typeIcon == 3) {
            iconTag = "fail";
        } else {
            iconTag = "wraning";
        }
        if (browser.ie == 6) {
            _mask = "<iframe frameborder='0' scrolling='no' class='ie6-mask'></iframe>";
        }
        $hideSeekTip.html(_mask + '<div class="hideseek-tip-container"><i class="msg-icon-' + iconTag + '"></i><div class="hideseek-tip-content">' + msg + '</div></div>').show();


        //计算top,left 值
        function calculatePos() {
            modalWidth = $hideSeekTip.outerWidth(); //计算宽度
            if ( $doc.scrollTop() + $win.height() > $doc.height() ) {
                modalTop = $doc.height() - $win.height() / 2 - 40;
            } else {
                modalTop = $doc.scrollTop() + $win.height() / 2 - 40;
            }

            if ( $win.width() >= $doc.width() ) {
                modalLeft = $doc.width() / 2 - modalWidth / 2;
            } else {
                if ( $win.width() <= modalWidth ) {
                    if ( $doc.scrollLeft() + $win.width() + (modalWidth - $win.width()) / 2 > $doc.width() ) {
                        modalLeft = $doc.width() - modalWidth;
                    } else {
                        modalLeft = $doc.scrollLeft() + $win.width() / 2 - modalWidth / 2;
                    }
                } else {

                    modalLeft = $doc.scrollLeft() + $win.width() / 2 - modalWidth / 2;

                }
            }
            if (modalLeft < 0) {
                modalLeft = 0;
            }
        }

        //计算top,left 值
        calculatePos();
        $hideSeekTip.css({
            top     : modalTop,
            left    : modalLeft,
            width   : modalWidth,
            opacity : 10
        });


        //重置
        function reSetPos() {
            calculatePos(); //从新计算top,left 值
            $hideSeekTip.css({
                top   : modalTop,
                left  : modalLeft,
                width : modalWidth
            });
        }


        //调整大小
        function reSize() {
            if (_NumCount % 2 == 0) { //解决IE6下scrollLeft值问题
                reSetPos();
                _NumCount = 1;
            } else {
                ++_NumCount;
            }
        }
        if (!isPad) { //pad设备不支持浮动
            $win.bind({
                "scroll": reSetPos,
                "resize": reSize
            });
        }
        hideSeekTipTimeoutId = setTimeout(function() {
            $hideSeekTip.remove();
            if (typeof callback == "function") {
                callback.call();
            }
        }, delayTime);
    };
})(jQuery);