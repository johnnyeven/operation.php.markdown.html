$(function() {
    var inAction = false;
    var index = 0;
    var maxCount = $("#slider > div.nest-step").length;
    var windowHeight = $(window).height();

    var resize = function() {
        var innerHeight = 0;
        windowHeight = $(window).height();
        $("#slider > div.nest-step").each(function() {
            $(this).height(windowHeight);
            innerHeight += windowHeight;
        });
        $("#slider").height(innerHeight);
        $("#slider").css({
            top: -index * windowHeight
        });
    };
    var switchTo = function(index) {
        inAction = true;
        $("#slider").animate({
            top: -index * windowHeight
        }, {
            duration: 1000,
            easing: "easeInOutExpo",
            complete: function() {
                inAction = false;
            }
        });
    };
    var slideUp = function() {
        if(index < maxCount - 1) {
            switchTo(++index);
        }
    };
    var slideDown = function() {
        if(index > 0) {
            switchTo(--index);
        }
    };
    $(document).mousewheel(function(evt, detail) {
        if(!inAction) {
            if(detail < 0)
            {
                slideUp();
            }
            else
            {
                slideDown();
            }
        }
    });

    resize();
    window.onresize = resize;
});