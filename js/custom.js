(function ($) {
  "use strict";
  $(document).ready(function () {
    /*
		Jquery Mobile Menu
		============================*/
    $("#main-menu").meanmenu({
      meanScreenWidth: "767",
      meanMenuContainer: ".mobile-nav-menu",
    });
    /*
		Accordion Active JS
		============================*/
    $(".panel-heading a").on("click", function () {
      $(".panel-heading").removeClass("active");
      if (!$(this).closest(".panel").find(".panel-collapse").hasClass("in"))
        $(this).parents(".panel-heading").addClass("active");
    });

    /*
		Scrolling Js
		============================*/
    $.scrollIt({
      upKey: 38, // key code to navigate to the next section
      downKey: 40, // key code to navigate to the previous section
      easing: "swing", // the easing function for animation
      scrollTime: 600, // how long (in ms) the animation takes
      activeClass: "active", // class given to the active nav element
      onPageChange: null, // function(pageIndex) that is called when page is changed
      topOffset: 0, // offste (in px) for fixed top navigation
    });
  });
})(jQuery);
