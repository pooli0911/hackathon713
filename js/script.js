$(function () {

    $("#page_top").hide();
    $('.parallax').on("scroll", function () {
        console.log($('.parallax').scrollTop())
        if ($('.parallax').scrollTop() > 100) {
            $('#page_top').fadeIn("slow");
        } else {
            $('#page_top').fadeOut("slow");
        }
        if ($('.parallax').scrollTop() > 300) {
            $('.header').fadeOut("slow");
        } else {
            $('.header').fadeIn("slow");
        }
        if ($('.parallax').scrollTop() > 50) {
            $('.scroll-down').fadeOut();
        } else {
            $('.scroll-down').fadeIn();
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

    
    $(".hamburger").click(function(){
      $(this).toggleClass("is-active");
    });
    $(".hamburger").click(function () {
        $(".rwd-navbar").toggleClass(".pc_menu_click");
        if ($(".rwd-navbar").hasClass(".pc_menu_click")) {
            $(".rwd-navbar").css('transform', 'translate(-222.5px,0)');
            $(".rwd-navbar").css('transition-duration', '0.5s');
            $(".rwd-navbar").css('transition-timing-function', 'ease-in-out');

        } else {
            $(".rwd-navbar").css('transform', 'translate(222.5px,0)');
            $(".rwd-navbar").css('transition-duration', '0.5s');
            $(".rwd-navbar").css('transition-timing-function', 'ease-in-out');

        }
    });
      
})
