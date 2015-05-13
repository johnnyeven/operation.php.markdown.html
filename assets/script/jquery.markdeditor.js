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
				autoSize: true,
				mode: 1,			//0=简单模式，1=高级模式
				lineHeight: 20,
				headerContainer: ".header",
				panelContainer: "#editor-panel",
				groupButtonContainer: "#editor-button-group",
				aceContainer: "editor-textarea"
			};
			settings = $.extend({}, defaultSetting, settings);

			var text;
			var editor;

			if(typeof settings.headerContainer == "string") {
				settings.headerContainer = $(settings.headerContainer);
			}
			if(typeof settings.panelContainer == "string") {
				settings.panelContainer = $(settings.panelContainer);
			}
			if(typeof settings.groupButtonContainer == "string") {
				settings.groupButtonContainer = $(settings.groupButtonContainer);
			}

			//自适应宽高
			var autoSize = function() {
				var width = $(window).width();
				var height = $(window).height();
				settings.panelContainer.width(width >> 1);
				settings.panelContainer.height(height - settings.headerContainer.height());
				settings.groupButtonContainer.css("left", (width >> 1) - settings.groupButtonContainer.width());
			};

			if(settings.autoSize) {
				window.onresize = autoSize;
				autoSize();
			}

			editor = ace.edit(settings.aceContainer);
			editor.setTheme("ace/theme/tomorrow_night_eighties");
			editor.session.setMode("ace/mode/markdown");
			editor.session.setUseWrapMode(true);
		}
	});
	
})(jQuery);