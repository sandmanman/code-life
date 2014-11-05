/*
 * jQuery hideSeekTip - jQuery Plugin
 * Version: 1.0 (11/03/2014)
 * Requires: jQuery v1.11.1 （其他版本未测试）
 * 支持浏览器：IE6+ 及标准浏览器
 * 参考网络代码修改
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


(function($) {

    jQuery.hideSeekTip = function( options ) {

        //默认设置
        var defaults = {
            message   : "",
            delayTime : 2000,
            zIndex    : 9999,
            opacity   : 0,
            //图标类型 普通 normal , 成功 success , 错误 error , 警告 warning
            iconType  : "normal"
        };
        options = $.extend(defaults, options);

        if (typeof hideSeekTipTimeoutId !== "number") {
            hideSeekTipTimeoutId = 0
        }

        var $doc = $(document);
        var $win = $(window);
        var $hideSeekTip = $("#hideSeekTip");

        if ( $hideSeekTip.length <= 0 ) {
            $("body").append("<div id='hideSeekTip' class='hide-seek-tip'></div>");
            $hideSeekTip = $("#hideSeekTip");
        }

        $hideSeekTip.addClass("bounceIn").css({
            zIndex  : options.zIndex
        });

        if ( browser.ie == 6 || browser.ie == 7 ) {
            $hideSeekTip.css({
                position: "absolute"
            });
        } else {
            $hideSeekTip.css({
                position: "fixed"
            });
        }

        //清除旧的延时事件
        clearTimeout( hideSeekTipTimeoutId );

        $hideSeekTip.html('<div class="hideseek-tip-container"><i class="msg-icon-' + options.iconType + '"></i><div class="hideseek-tip-content">' + options.message + '</div></div>').show();


        //计算位置
        function calculatePos() {
            modalWidth = $hideSeekTip.outerWidth();
            modalHeight = $hideSeekTip.outerHeight();
            modalLeft = $win.outerWidth() / 2 - modalWidth / 2;
            modalTop = $win.outerHeight() / 2 - modalHeight / 2;
        }

        //计算位置
        calculatePos();
        $hideSeekTip.css({
            top   : modalTop,
            left  : modalLeft,
            width : modalWidth
        });

        //重置
        function reSetPos() {
            calculatePos(); //从新计算位置
            $hideSeekTip.css({
                top  : modalTop,
                left : modalLeft
            });
        }

        //随窗口重置位置
        $win.bind({
            "resize":reSetPos
        });

        hideSeekTipTimeoutId = setTimeout(function() {
            $hideSeekTip.remove();
        }, options.delayTime);
    };

    
})(jQuery);