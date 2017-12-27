(function($) {
    "use strict";

    //Preloader
    $(window).load(function() {
        $('.images-preloader').fadeOut();
    });

    //Header Scroll

    function init() {
        window.addEventListener('scroll', function(e) {

            var mq = window.matchMedia("(min-width: 992px)");

            if (mq.matches) {
                var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                    shrinkOn = 10,
                    header = document.querySelector(".main-bar");
                if (distanceY > shrinkOn) {
                    classie.add(header, "smaller");
                } else {
                    if (classie.has(header, "smaller")) {
                        classie.remove(header, "smaller");
                    }

                }
            }


        });
    }
    window.onload = init();

    // Elements Animation Important
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    //Position Navigation

    $(window).on('resize', function() {
        var hbar = $('.site-header').outerHeight(),
            sbar = $('header .sub-bar').height();
        $('.main-bar .nav').css('top', hbar);
        $("header .main-bar").css('top', sbar);
    }).trigger('resize');

    (function($) {
        $(document).ready(function() {
            $(window).load(function() {
            $('.nav_slide_button').on('click',function() {
              $('.top-search').slideToggle();

            });
            $('#search-delete').on('click',function() {
              $(".top-search").slideUp("slow");
            });
          });
            
        document.querySelector("#search-toggle").addEventListener("click", function() {
            this.classList.toggle("active");
          });
        });
    }(window.jQuery || window.$));
    // Menu Mobile

    $('.btn-toggle').on('click',function() {

        var parent = $(this).parents('header');
        if (parent.find('nav').hasClass('menu-mobile')) {
            parent.find('nav').removeClass('menu-mobile');
        } else {
            parent.find('nav').addClass('menu-mobile');
        }

        if (parent.find('.top-info').hasClass('menu-mobile')) {
            parent.find('.top-info').removeClass('menu-mobile');
        } else {
            parent.find('.top-info').addClass('menu-mobile');
        }

    });

    //Submenu Dropdown Toggle
    if($('.site-header li.menu-item-has-children ul').length){
        $('.site-header li.menu-item-has-children').append('<div class="dropdown-btn"><Span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.site-header li.menu-item-has-children .dropdown-btn').on('click', function() {
            $(this).prev('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        $('.navigation li.menu-item-has-children > a').on('click', function(e) {
            e.preventDefault();
        });
    }

    //All Sliders




    $("#testimonials").owlCarousel({
        navigation: false,
        slideSpeed: 600,
        autoPlay: 6000,
        singleItem: true,
        pagination: true,
        navigationText: [
            "<i class='fa fa-caret-left'></i>",
            "<i class='fa fa-caret-right'></i>"
        ],
    });

    $("#top-slider").owlCarousel({
        navigation: true,
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        slideSpeed: 600,
        autoPlay: 8000,
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 2],
        itemsTablet: [768, 1],
        itemsMobile: [479, 1],
        pagination: false
    });

    jQuery(document).ready(function($) {
        $("#layerslider").layerSlider({
            responsive: true,
            navPrevNext: true,
            navStartStop: true,
            navButtons: true,
            layersContainer: 1170,
            skinsPath: 'layerslider/skins/',
        });
    });


    (function($) {
        $.wmBox = function() {
            $('body').prepend('<div class="wmBox_overlay"><div class="wmBox_centerWrap"><div class="wmBox_centerer"><div class="wmBox_contentWrap"><div class="wmBox_scaleWrap"><div class="wmBox_closeBtn"><p>x</p></div>');
        };
        $('[data-popup]').on('click',function(e) {
            e.preventDefault();
            $('.wmBox_overlay').fadeIn(750);
            var mySrc = $(this).attr('data-popup');
            $('.wmBox_overlay .wmBox_scaleWrap').append('<iframe src="' + mySrc + '">');

            $('.wmBox_overlay iframe').on('click',function(e) {
                e.stopPropagation();
            });
            $('.wmBox_overlay').on('click',function(e) {
                e.preventDefault();
                $('.wmBox_overlay').fadeOut(750, function() {
                    $(this).find('iframe').remove();
                });
            });
        });
    }(jQuery));

    $(document).ready(function() {
        $.wmBox();
    });

    //Back To Top
    $('#to-top').on('click',function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


})(jQuery);