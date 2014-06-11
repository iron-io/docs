




$(document).ready(function() {

  $("#header").headroom({
    "tolerance": 40,
    "offset": 205,
  });

  function pin_sidebar() {

    sidebar_height = $('.sidebar-content').height();
    window_height = $(window).height();
    whatever_scrollbar = window.innerHeight;
    offset = $(window).scrollTop();
    bottom_of_sidebar = sidebar_height + offset;
    bottom_of_container = $(".docs").offset().top + $(".docs").height();
    sticking_point = bottom_of_container;


    if ($(window).height() < 484)
    {
      scrolly = $('.sidebar-content').hasClass('scrolly');
      if (offset < 200)
      {
        $('.sidebar-content').attr('style','');
        $(".sidebar-content").removeClass("pinned");
        $(".sidebar-content").addClass("stuck");
        $('.sidebar-content').removeClass('scrolly');
        return;
      }
        else if (offset > $('.content-container').height()-$('.content-container').offset().top) //bottom_of_container - 275)
{
  $('.sidebar-content').attr('style','');
  $('.sidebar-content').css('top', bottom_of_container - 700);
  $(".sidebar-content").removeClass("pinned");
  $(".sidebar-content").addClass("stuck");
  $('.sidebar-content').removeClass('scrolly');
  return;
}
else if (!scrolly)
{
  $('.sidebar-content').attr('style','');
  $('.sidebar-content').css('max-height', $(window).height());
  $('.sidebar-content').css('overflow-y', "scroll");
  $(".sidebar-content").removeClass("stuck");
  $(".sidebar-content").addClass("pinned");
  $('.sidebar-content').addClass('scrolly');
  return;
} else if (scrolly){
  return;
}
}

if($(".docs").height() - sidebar_height < 100) {
 $(".sidebar-content").removeClass("pinned");
 $(".sidebar-content").removeClass("stuck");
 $(".sidebar-content").css("top", "");
 return;
}


    // if (window_height - sidebar_height < 0) {
    //  $('.sidebar-content').css("max-height", whatever_scrollbar);
    //  $('.sidebar-content').css("overflow-y", "scroll");
    //  $(".sidebar-content").css("top", "");
    // } else {
    //  $(".sidebar-content").css("max-height", "");
    //  $(".sidebar-content").css("overflow-y", "");
    // }

    if(bottom_of_sidebar < sticking_point) {
      if (offset > 219 && document.width / window.innerWidth == 1) {
        $('.sidebar-content').addClass('pinned');
        $(".sidebar-content").removeClass("stuck");
        $(".sidebar-content").css("top", '');
      } else {
        $('.sidebar-content').removeClass('pinned');
        $(".sidebar-content").removeClass("stuck");
        $(".sidebar-content").css("top", '');
      }
    } else {
      $(".sidebar-content").css("top", -(bottom_of_sidebar-sticking_point));
    }
  }

  $(function() {
    $(window).scroll(pin_sidebar);
    $(window).resize(pin_sidebar);
    $('.sidebar-content').scroll(function(e) { e.stopPropagation(); } );
  });
});