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
				previewContainer: "#preview-panel",
				groupButtonContainer: "#editor-button-group",
				aceContainer: "editor-textarea",
				previewContentContainer: "#preview-content"
			};
			settings = $.extend({}, defaultSetting, settings);

			var editor;
			var editorChanged = true;
			var lastModify = 0;
			var changed = [];

			if(typeof settings.headerContainer == "string") {
				settings.headerContainer = $(settings.headerContainer);
			}
			if(typeof settings.panelContainer == "string") {
				settings.panelContainer = $(settings.panelContainer);
			}
			if(typeof settings.previewContainer == "string") {
				settings.previewContainer = $(settings.previewContainer);
			}
			if(typeof settings.groupButtonContainer == "string") {
				settings.groupButtonContainer = $(settings.groupButtonContainer);
			}
			if(typeof settings.previewContentContainer == "string") {
				settings.previewContentContainer = $(settings.previewContentContainer);
			}

			//自适应宽高
			var autoSize = function() {
				var width = $(window).width();
				var height = $(window).height();
				settings.panelContainer.width(width >> 1);
				settings.panelContainer.height(height - settings.headerContainer.height());
				settings.previewContainer.width(width >> 1);
				settings.previewContainer.height(height - settings.headerContainer.height());
				settings.groupButtonContainer.css("left", (width >> 1) - settings.groupButtonContainer.width());
			};

			var updatePreview = function() {
				var time = new Date().getTime();
				if(editorChanged && time > lastModify + 1000) {
					var md = editor.getValue();
					var tmp = [];
					var lang = [];
					var i = 0;
					md = md.replace(/```([a-zA-Z]+)?\n/g, function(str, p) {
						tmp.push(p);
						if(i % 2 > 0) {
							++i;
							return "```\n";
						}
						++i;
						return '```';
					});
					for(var i in tmp) {
						if(i % 2 == 0) {
							lang.push(tmp[i]);
						}
					}
					var html = markdown.toHTML(md);
					var i = 0;
					html = html.replace(/<code>([\w\W]*?)<\/code>/g, function(str, p1) {
						var code = '<code>';
						if(lang[i]) {
							code = '<code class="language-' + lang[i] + '">';
						}
						++i;
						return '<pre class="prettyprint linenums">' + code + p1 + '</code></pre>';
					});
					settings.previewContentContainer.html(html);
					prettyPrint();
					editorChanged = false;

					changed.length = 0;
				}
			};

			setInterval(updatePreview, 100);

			if(settings.autoSize) {
				window.onresize = autoSize;
				autoSize();
			}

			editor = ace.edit(settings.aceContainer);
			editor.setShowPrintMargin(false);
			editor.setTheme("ace/theme/tomorrow_night_eighties");
			editor.session.setMode("ace/mode/markdown");
			editor.session.setUseWrapMode(true);

			editor.session.on("change", function(e) {
				changed.push(e);
				lastModify = new Date().getTime();
				editorChanged = true;
			});
		}
	});
	
})(jQuery);