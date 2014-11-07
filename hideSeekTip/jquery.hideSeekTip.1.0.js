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

        options = $.extend(true, {}, $.hideSeekTip.defaultOptions, options);

        //options = $.extend(defaults, options);

        if (typeof hideSeekTipTimeout !== "number") {
            hideSeekTipTimeout = 0
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
                position: "absolute" //ie6/7不支持fixed
            });
        } else {
            $hideSeekTip.css({
                position: "fixed"
            });
        }

        //清除旧的延时事件
        clearTimeout( hideSeekTipTimeout );

        var html = '<div class="hideseek-tip-container"><i class="msg-icon-' + options.iconType + '"></i><div class="hideseek-tip-content">' + options.message + '</div></div>';
        if (options.allowDismiss)
            html += '<span class="close" title="关闭">&times;</span>';
        $hideSeekTip.html(html).show(); 

        //计算位置
        function calculatePos() {
            modalWidth  = $hideSeekTip.outerWidth();
            modalHeight = $hideSeekTip.outerHeight();
            modalLeft   = $win.outerWidth() / 2 - modalWidth / 2;
            modalTop    = $win.outerHeight() / 2 - modalHeight / 2;
        }

        //计算位置
        calculatePos();
        $hideSeekTip.css({
            top   : modalTop,
            left  : modalLeft
        });

        //重置
        function reSetPos() {
            calculatePos(); //重新计算位置
            $hideSeekTip.css({
                top  : modalTop,
                left : modalLeft
            });
        }

        //随窗口重置位置
        $win.bind({
            "resize" : reSetPos
        });

        //移除
        function removeTip(){
            $hideSeekTip.fadeOut(function(){
                $hideSeekTip.remove();
            });
        }

        hideSeekTipTimeout = setTimeout(function() {
            removeTip();
        }, options.delayTime);

        //手动关闭
        $hideSeekTip.find(".close").click( removeTip );

    };

    //默认设置
    $.hideSeekTip.defaultOptions = {
        width: "auto",
        message: "",
        delayTime: 2000,
        zIndex: 9999,
        iconType: "normal", //图标类型 普通 normal , 成功 success , 错误 error , 警告 warning
        allowDismiss: false  //是否需要手动关闭按钮 true false
    };
    
})(jQuery);