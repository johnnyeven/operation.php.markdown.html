/**
 * 
 * @authors johnnyeven (johnnyeven@gmail.com)
 * @date    2015-03-12 11:38:20
 * @version 1
 */
 
(function($) {
	
	$.extend($.fn, {
		markdeditor: function(settings) {
			var defaultSetting = {
				wrapper: this,		//自定义容器，默认就是this
			};
			settings = $.extend({}, defaultSetting, settings);
		}
	});
	
})(jQuery);