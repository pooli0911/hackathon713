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

<<<<<<< HEAD
    gameBtnInit();
=======
    
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
      
>>>>>>> 2fd9acfbe9748b24702e31c5a67b0e017d9c6717
})
	
function gameBtnInit(){
    $('#btn-1-1-1').click(function(event) {
        checkAns(1,1,1,1);
      });
      $('#btn-1-1-2').click(function(event) {
        checkAns(1,1,2,0);
      });
      $('#btn-1-1-3').click(function(event) {
        checkAns(1,1,32,0);
      });
}
function checkAns(n1,n2,n3,isCorrect) {
    $('#game-'+n1+'-'+n2).modal('hide');
    if(isCorrect==1){
      $('#game-sus'+n1+'-'+n2).modal('show');
      $('#answer-'+n1+'-'+n2).addClass('circle-view');
    }else{
      $('#game-fail').modal('show');
    }
  }
