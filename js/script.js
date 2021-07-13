$(function () {
    $("#page_top").hide();
    $('.parallax').on("scroll", function () {
        console.log($('.parallax').scrollTop())
        if ($('.parallax').scrollTop() > 100) {
            $('#page_top').fadeIn("slow");
        } else {
            $('#page_top').fadeOut("slow");
        }


        scrollHeight = $('.parallax').height();
        scrollPosition = $('.parallax').height() + $('.parallax').scrollTop();
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
        $('.parallax').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
})