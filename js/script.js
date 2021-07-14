$(function () {

    $("#page_top").hide();
    $('.parallax').on("scroll", function () {
        //console.log($('.parallax').scrollTop())
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

    gameBtnInit();
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

    // 遊戲切換頁面

    gameSwitch(0)
    $('.game-home-icon').click(function(event) {
        gameSwitch(0)
      });
      $('#game-1-btn').click(function(event) {
        gameSwitch(1)
      });
      $('#game-2-btn').click(function(event) {
        gameSwitch(2)
      });
})

function gameBtnInit(){
    $('#btn-1-1-1').click(function(event) {
        checkAns(1,1,1,1);
      });
    $('#btn-1-1-2').click(function(event) {
        checkAns(1,1,2,0);
      });
    $('#btn-1-1-3').click(function(event) {
        checkAns(1,1,3,0);
      });
    $('#btn-1-2-1').click(function(event) {
        checkAns(1,2,1,0);
      });
    $('#btn-1-2-2').click(function(event) {
        checkAns(1,2,2,1);
      });
    $('#btn-1-2-3').click(function(event) {
        checkAns(1,2,3,0);
      });
    $('#btn-1-3-1').click(function(event) {
        checkAns(1,3,1,0);
      });
    $('#btn-1-3-2').click(function(event) {
        checkAns(1,3,2,0);
      });
    $('#btn-1-3-3').click(function(event) {
        checkAns(1,3,3,0);
      });
    $('#btn-1-3-4').click(function(event) {
        checkAns(1,3,3,1);
      });
    $('#btn-1-4-1').click(function(event) {
        checkAns(1,4,1,0);
      });
    $('#btn-1-4-2').click(function(event) {
        checkAns(1,4,2,0);
      });
    $('#btn-1-4-3').click(function(event) {
        checkAns(1,4,3,1);
      });
    $('#btn-1-4-4').click(function(event) {
        checkAns(1,4,3,0);
      });
    $('#btn-1-5-1').click(function(event) {
        checkAns(1,5,1,0);
      });
    $('#btn-1-5-2').click(function(event) {
        checkAns(1,5,2,0);
      });
    $('#btn-1-5-3').click(function(event) {
        checkAns(1,5,3,0);
      });
    $('#btn-1-5-4').click(function(event) {
        checkAns(1,5,3,1);
      });
    $('#btn-1-6-1').click(function(event) {
        checkAns(1,6,1,0);
      });
    $('#btn-1-6-2').click(function(event) {
        checkAns(1,6,2,0);
      });
    $('#btn-1-6-3').click(function(event) {
        checkAns(1,6,3,0);
      });
    $('#btn-1-6-4').click(function(event) {
        checkAns(1,6,3,1);
      });
    $('#btn-1-7-1').click(function(event) {
        checkAns(1,7,1,0);
      });
    $('#btn-1-7-2').click(function(event) {
        checkAns(1,7,2,0);
      });
    $('#btn-1-7-3').click(function(event) {
        checkAns(1,7,3,1);
      });
    $('#btn-1-7-4').click(function(event) {
        checkAns(1,7,3,0);
      });
    /////////
    $('#btn-2-1-1').click(function(event) {
      checkAns(2,1,1,0);
    });
    $('#btn-2-1-2').click(function(event) {
      checkAns(2,1,2,0);
    });
    $('#btn-2-1-3').click(function(event) {
      checkAns(2,1,3,1);
    });
    $('#btn-2-1-4').click(function(event) {
      checkAns(2,1,3,0);
    });
    $('#btn-2-2-1').click(function(event) {
      checkAns(2,2,1,0);
    });
    $('#btn-2-2-2').click(function(event) {
      checkAns(2,2,2,1);
    });
    $('#btn-2-2-3').click(function(event) {
      checkAns(2,2,3,0);
    });
    $('#btn-2-2-4').click(function(event) {
      checkAns(2,2,3,0);
    });
    $('#btn-2-3-1').click(function(event) {
      checkAns(2,3,1,0);
    });
    $('#btn-2-3-2').click(function(event) {
      checkAns(2,3,2,0);
    });
    $('#btn-2-3-3').click(function(event) {
      checkAns(2,3,3,0);
    });
    $('#btn-2-3-4').click(function(event) {
      checkAns(2,3,3,1);
    });
    $('#btn-2-4-1').click(function(event) {
      checkAns(2,4,1,1);
    });
    $('#btn-2-4-2').click(function(event) {
      checkAns(2,4,2,0);
    });
    $('#btn-2-4-3').click(function(event) {
      checkAns(2,4,3,0);
    });
    $('#btn-2-4-4').click(function(event) {
      checkAns(2,4,3,0);
    });
    $('#btn-2-5-1').click(function(event) {
      checkAns(2,5,1,0);
    });
    $('#btn-2-5-2').click(function(event) {
      checkAns(2,5,2,0);
    });
    $('#btn-2-5-3').click(function(event) {
      checkAns(2,5,3,0);
    });
    $('#btn-2-5-4').click(function(event) {
      checkAns(2,5,3,1);
    });
}
function checkAns(n1,n2,n3,isCorrect) {
    $('#game-'+n1+'-'+n2).modal('hide');
    if(isCorrect==1){
      $('#game-sus'+n1+'-'+n2).modal('show');
      $('#answer-'+n1+'-'+n2).addClass('circle-view');
      
    }else{
      $('#game-fail-'+n1).modal('show');
    }
  }



 // 遊戲切換頁面
let initMain =()=>{
    $('.game-play-home').click(function(event){
        gameSwitch(0);
});
}
function gameSwitch(n) {
    $('.game-play-home').hide();
    $('.game-play-1').hide();
    $('.game-play-2').hide();
    // $('.game-3').hide();
    // $('.game-4').hide();
    // $('.game-5').hide();
    if(n==0){
      $('.game-play-home').show();
    }else{
      $('.game-play-'+n).show();
    }
  }