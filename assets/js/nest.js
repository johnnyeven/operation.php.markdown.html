$(function() {
    var inAction = false;
    var index = 0;
    var lastIndex = 0;
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
    var getStep = function(index) {
        return $("#slider > .nest-step").eq(index);
    };
    var reset0 = function() {
        var target = getStep(0);
        if(target.length > 0) {
            var img = target.find(".nest-step-container > .step-separate > .nest-step-left > .nest-step-img-container > img");
            if(img.length > 0) {
                img.stop();
                img.css({
                    bottom: -128,
                    opacity: 0
                });
            }
        }
        var text = target.find(".nest-step-container > .step-separate > .nest-step-right");
        text.stop();
        text.css({
            opacity: 0
        });
    };
    var reset1 = function() {
        var target = getStep(1);
        if(target.length > 0) {
            var img = target.find(".nest-step-container > .step-separate > .nest-step-left > .nest-step-img-container > img");
            if(img.length > 0) {
                img.stop();
                img.css({
                    bottom: -128,
                    opacity: 0
                });
            }
        }
        var text = target.find(".nest-step-container > .step-separate > .nest-step-right");
        text.stop();
        text.css({
            opacity: 0
        });
    };
    var reset2 = function() {
        var target = getStep(2);
        if(target.length > 0) {
            var text = target.find(".nest-step-container > *");
            if(text.length > 0) {
                text.stop();
                text.css({
                    opacity: 0
                });
            }
        }
    };
    var resetAll = function() {
        reset0();
        reset1();
        reset2();
    };
    var resetLast = function() {
        switch(lastIndex) {
            case 0:
                reset0();
                break;
            case 1:
                reset1();
                break;
            case 2:
                reset2();
                break;
        }
    }
    var play0 = function() {
        var target = getStep(0);
        if(target.length > 0) {
            var img = target.find(".nest-step-container > .step-separate > .nest-step-left > .nest-step-img-container > img");
            if (img.length > 0) {
                img.animate({
                    bottom: 0,
                    opacity: 1
                }, {
                    duration:1000,
                    easing: "easeOutExpo",
                    complete: function() {
                        var text = target.find(".nest-step-container > .step-separate > .nest-step-right");
                        text.animate({
                            opacity: 1
                        });
                    }
                });
            }
        }
    };
    var play1 = function() {
        var target = getStep(1);
        if(target.length > 0) {
            var img = target.find(".nest-step-container > .step-separate > .nest-step-left > .nest-step-img-container > img");
            if (img.length > 0) {
                img.animate({
                    bottom: 0,
                    opacity: 1
                }, {
                    duration:1000,
                    easing: "easeOutExpo",
                    complete: function() {
                        var text = target.find(".nest-step-container > .step-separate > .nest-step-right");
                        text.animate({
                            opacity: 1
                        });
                    }
                });
            }
        }
    };
    var play2 = function() {
        var target = getStep(2);
        if(target.length > 0) {
            var text = target.find(".nest-step-container > *");
            text.eq(0).animate({
                opacity: 1
            }, 500, function() {
                text.eq(1).animate({
                    opacity: 1
                }, 500, function() {
                    text.eq(2).animate({
                        opacity: 1
                    }, 500, function() {
                        text.eq(3).animate({
                            opacity: 1
                        }, 500);
                    });
                });
            });
        }
    };
    var playAnimation = function() {
        switch(index) {
            case 0:
                play0();
                break;
            case 1:
                play1();
                break;
            case 2:
                play2();
                break;
        }
    }
    var switchTo = function(index) {
        inAction = true;
        $("#slider").animate({
            top: -index * windowHeight
        }, {
            duration: 1000,
            easing: "easeInOutExpo",
            complete: function() {
                inAction = false;
                resetLast();
                playAnimation();
            }
        });

        $("#slider-action > ul > li").removeClass("active");
        $("#slider-action > ul > li").eq(index).addClass("active");
    };
    var slideUp = function() {
        if(index < maxCount - 1) {
            lastIndex = index;
            switchTo(++index);
        }
    };
    var slideDown = function() {
        if(index > 0) {
            lastIndex = index;
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
    $("#slider-action > ul > li > a").click(function() {
        lastIndex = index;
        index = $("#slider-action > ul > li > a").index($(this));
        switchTo(index);
    });

    resize();
    $("body").show();
    resetAll();
    play0();
    window.onresize = resize;
});