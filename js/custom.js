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
		Why Choose Us Crousel
		============================*/
    $(".why-choose-all-inner").owlCarousel({
      autoplay: true,
      pagination: false,
      nav: true,
      dots: false,
      margin: 20,
      items: 3,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 3,
        },
      },
    });
    /*
		Project Feed Back Crousel
		============================*/
    $(".project-feedback").owlCarousel({
      autoplay: true,
      pagination: false,
      nav: false,
      dots: false,
      items: 1,
      navText: [
        "<i class='fa fa-angle-left'></i>",
        "<i class='fa fa-angle-right'></i>",
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        768: {
          items: 1,
        },
        992: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });
    /*
		Testimonial Crousel
		============================*/
    $(".all-testimonial").owlCarousel({
      autoplay: true,
      pagination: false,
      nav: false,
      dots: true,
      items: 1,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        768: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });

    /*
		Slider Crousel
		============================*/
    // Disable owlCarousel if not present (static hero fallback)
    if ($(".all-slide").find(".owl-item").length > 1) {
      $(".all-slide").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 1000,
      });
    } else {
      // Static slide fallback
      $(".all-slide").addClass("static-slide-ready");
    }

    $(".all-slide").on("translate.owl.carousel", function () {
      $(".slider-text h1").removeClass("animated fadeInUp").css("opacity", "0");
      $(".slider-text p")
        .removeClass("animated fadeInDown")
        .css("opacity", "0");
      $(".slider-text ul")
        .removeClass("animated fadeInDown")
        .css("opacity", "0");
    });

    $(".all-slide").on("translated.owl.carousel", function () {
      $(".slider-text h1").addClass("animated fadeInUp").css("opacity", "1");
      $(".slider-text p").addClass("animated fadeInDown").css("opacity", "1");
      $(".slider-text ul").addClass("animated fadeInDown").css("opacity", "1");
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

    /*
		scrollUp
		============================*/
    // $.scrollUp({
    //   scrollText: '<i class="fa fa-long-arrow-up"></i>',
    //   easingType: "linear",
    //   scrollSpeed: 900,
    //   animation: "fade",
    // });
    /*
		Counter Js
		============================*/
    $(".counter").counterUp({
      delay: 10,
      time: 1000,
    });

    /*
		Stikey Js
		============================*/
    /* 		(function () {
			var nav = $('.hd-sec');
			var scrolled = false;
			$(window).scroll(function () {
				if (120 < $(window).scrollTop() && !scrolled) {
					nav.addClass('sticky_menu animated fadeInDown').animate({ 'margin-top': '0px' });
					scrolled = true;
				}
				if (120 > $(window).scrollTop() && scrolled) {
					nav.removeClass('sticky_menu animated fadeInDown').css('margin-top', '0px');
					scrolled = false;
				}
			});
		}()); */

    /*
		Magnific Popup
		============================*/
    $(".gallery-photo").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });

    /*
		Project Gallery Js
		============================*/
    $(".gallery-container").imagesLoaded(function () {
      $(".gallery-container").isotope({
        itemSelector: ".filtr-item",
        layoutMode: "fitRows",
      });
      $("ul.simplefilter li").on("click", function () {
        $("ul.simplefilter li").removeClass("active");
        $(this).addClass("active");

        var selector = $(this).attr("data-filter");
        $(".gallery-container").isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    });
    /*
		Preeloader
		============================*/
    $(window).on("load", function () {
      $("#preloader").fadeOut();
      $("#preloader-status").delay(200).fadeOut("slow");
      $("body").delay(200).css({ "overflow-x": "hidden" });
    });
  });
})(jQuery);
