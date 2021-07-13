$(function () {
    $("#page_top").hide();
    $(window).on("scroll", function () {

        if ($(this).scrollTop() > 100) {
            $('#page_top').fadeIn("slow");
        } else {
            $('#page_top').fadeOut("slow");
        }


        scrollHeight = $(document).height();
        scrollPosition = $(window).height() + $(window).scrollTop();
        footHeight = $("footer").innerHeight();

        if (scrollHeight - scrollPosition <= footHeight) {
            $("#page_top").css({
                "position": "absolute",
                "bottom": footHeight + 60
            });
        } else {
            $("#page_top").css({
                "position": "fixed",
                "bottom": "20px"
            });
        }
    });

    $('#page_top a').on('click', function () {
        $('body, html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
})