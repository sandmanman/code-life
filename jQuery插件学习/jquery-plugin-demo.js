/* jQuery插件学习 */

(function($){

	$.fn.pluginName = function(options){//pluginName 插件名

		var setting = $.extend({
			//默认设置
		}, options);

		return this.each(function(){
			//具体
		});

	}

}(jQuery));
