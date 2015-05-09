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
				autosize: true,
				panelContainer: "#editor-panel"
			};
			settings = $.extend({}, defaultSetting, settings);

			if(typeof settings.panelContainer == "string") {
				settings.panelContainer = $(settings.panelContainer);
			}

			var autoSize = function() {
				var width = $(window).width();
				var height = $(window).height();
				settings.panelContainer.width(width / 2);
				settings.panelContainer.height(height - 50);
			};

			if(settings.autosize) {
				window.onresize = autoSize;
				autoSize();
			}
		}
	});
	
})(jQuery);