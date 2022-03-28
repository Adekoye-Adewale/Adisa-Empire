
$(document).ready(function(){

  //Swipe speed:
  var speed = "500"; //ms.

  
  var interactiveElements = $('input, button, a');
  var itemsLength = $('.panel').length;
  var active = 1;

  
  for (i=1; i<=itemsLength; i++){
    var $layer = $(".panel:nth-child("+i+")");
    var bgImg = $layer.attr("data-img");
    $layer.css({
      "background": "url("+bgImg+") no-repeat center",
      "background-size": "cover",
    });
  };

  //Transitions:
  setTimeout(function() {
    $(".panel").css({
      "transition": "cubic-bezier(.4,.95,.5,1.5) "+speed+"ms"
    });
  }, 100);

 
  $(".panel:not(:first)").addClass("right");

  //Swipe:
  function swipeScreen() {
    $('.swipe').on('mousedown touchstart', function(e) {

      var touch = e.originalEvent.touches;
      var start = touch ? touch[0].pageX : e.pageX;
      var difference;

      $(this).on('mousemove touchmove', function(e) {
        var contact = e.originalEvent.touches,
        end = contact ? contact[0].pageX : e.pageX;
        difference = end-start;
      });

      //On touch end:
      $(window).one('mouseup touchend', function(e) {
        e.preventDefault();

        //Swipe right:
        if (active < itemsLength && difference < -30) {
          $(".panel:nth-child("+active+")").addClass("left");
          $(".panel:nth-child("+(active+1)+")").removeClass("right");
          active += 1;
          btnDisable();
        };

        // Swipe left:
        if (active > 1 && difference > 30) {
          $(".panel:nth-child("+(active-1)+")").removeClass("left");
          $(".panel:nth-child("+active+")").addClass("right");
          active -= 1;
          btnDisable();
        };

        $('.swipe').off('mousemove touchmove');
      });

    });
  };
  swipeScreen();

  //Prevent swipe on interactive elements:
  interactiveElements.bind('touchstart touchend touchup', function(e) {
    e.stopPropagation();
  });

  //Buttons:
  $(".btn-prev").click(function(){
    // Swipe left:
    if (active > 1) {
      $(".panel:nth-child("+(active-1)+")").removeClass("left");
      $(".panel:nth-child("+active+")").addClass("right");
      active -= 1;
      btnDisable();
    };
  });

  $(".btn-next").click(function(){
    //Swipe right:
    if (active < itemsLength) {
      $(".panel:nth-child("+active+")").addClass("left");
      $(".panel:nth-child("+(active+1)+")").removeClass("right");
      active += 1;
      btnDisable();
    };
  });

  function btnDisable() {
    if (active >= itemsLength) {
      $(".btn-next").prop("disabled", true);
      $(".btn-prev").prop("disabled", false);
    }
    else if (active <= 1) {
      $(".btn-prev").prop("disabled", true);
      $(".btn-next").prop("disabled", false);
    }
    else {
      $(".btn-prev, .btn-next").prop("disabled", false);
    };
  };

});