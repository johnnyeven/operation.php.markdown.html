$(function() {
    $("#step1, #step2").css({
        opacity: 0
    });
    $("#step1").animate({
        opacity: 1
    });
    $("#btnNext").click(function() {
        $("#step1").animate({
            opacity: 0
        }, {
            duration: 500,
            complete: function() {
                $(this).hide();
                $("#step2").show();
                $("#step2").animate({
                    opacity: 1
                });
            }
        });
    });
    $("#btnPrev").click(function() {
        $("#step2").animate({
            opacity: 0
        }, {
            duration: 500,
            complete: function() {
                $(this).hide();
                $("#step1").show();
                $("#step1").animate({
                    opacity: 1
                });
            }
        });
    });
});