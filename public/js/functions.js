(function ($) {
  var wH = $(window).height(),
    wW = $(window).width(),
    ua = navigator.userAgent,
    touchendOrClick = (ua.match(/iPad|iPhone|iPad/i)) ? "touchend" : "click",

    deviceAgent = navigator.userAgent.toLowerCase(),
    isMobile = deviceAgent.match(/(iphone|ipod|ipad)/);

  FastClick.attach(document.body);

  $(window).resize(function() {
    setTimeout(function() {
      $('.header_container').css({
        height: $('.header').outerHeight()
      });
    }, 30);

    $('.video iframe').css({
      maxHeight: $(window).outerHeight() - $('header').outerHeight()
    });

    $('body').css({
      paddingBottom: $('footer').outerHeight()
    })
  }).trigger('resize');

// Tel
  if (!isMobile) {
    $('body').on('click', 'a[href^="tel:"]', function() {
      $(this).attr('href',
        $(this).attr('href').replace(/^tel:/, 'callto:'));
    });
  }

  $(function() {

    $('.scrollToAnchor').on('click', function(e) {
      e.preventDefault();
      var target = $(this).attr('href');

      $('html,body').animate({
        scrollTop: $(target).offset().top - 30
      }, 1000);

    });
  });


  $('.features__item, .animElem').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('inview animated fadeInUp');
      if (visiblePartY == 'top') {
        // top part of element is visible
      } else if (visiblePartY == 'bottom') {
        // bottom part of element is visible
      } else {

      }
    } else {
    }
  });


  $('.animElemFade').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
    if (isInView) {
      $(this).addClass('inview');
      if (visiblePartY == 'top') {
        // top part of element is visible
      } else if (visiblePartY == 'bottom') {
        // bottom part of element is visible
      } else {

      }
    } else {
    }
  });


  $(function() {

    $('#navbar-collapse')
      .on('click', function(e) {
        $('body').toggleClass('menu-collapsed');
      });

  });

  $(function() {
    //caches a jQuery object containing the header element
    var header = $(".header");
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();

      if (scroll >= 10) {
        header.addClass("fixed");
      } else {
        header.removeClass("fixed")
      }
    });
  });



  function parallaxScroll(cont, el){
    var pxElem = cont.find(el);

    pxElem.each(function(){
      var scrolled = parseInt($(window).scrollTop() - $(this).offset().top),
        depth = $(this).attr('data-depth');

      $(this).css({
        '-webkit-transform': 'translate3d(0,' + (-(scrolled * depth)) + 'px, 0)',
        '-moz-transform': 'translate3d(0,' + (-(scrolled * depth)) + 'px, 0)',
        '-ms-transform': 'translate3d(0,' + (-(scrolled * depth)) + 'px, 0)',
        '-o-transform': 'translate3d(0,' + (-(scrolled * depth)) + 'px, 0)',
        'transform': 'translate3d(0,' + (-(scrolled * depth)) + 'px, 0)'
      });
    });
  }

  if (!isMobile && wW >= 767) {
    if($('.parallax-elem').length) {
      parallaxScroll($('.effect-parallax'), $('.parallax-elem'));
    }
    $(window).bind('scroll',function(e){
      if($('.parallax-elem').length) {
        parallaxScroll($('.effect-parallax'), $('.parallax-elem'));
      }
    });
  }

  $('[data-control="select"] ._value').text($(this).siblings('select').val());
  $('[data-control="select"] select').on('change', function() {
    $(this).siblings('.select__value').find('._value').text(this.value);
  });
})(window.jQuery);

$(window).scroll(function() {
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    $('body').find('#launcher').css({
      bottom: $('.footer').outerHeight()
    })
  }

  else {
    $('body').find('#launcher').css({
      bottom: 0
    })
  }
});

$(function() {
  var msg = $('#msg');

  $('.form--message').on('click', function(e) {e.stopPropagation()})
  msg.bind('focus', function(){ $(this).parents('.form--message').addClass('focused'); })
    .keyup(function(){
      if ($(this).val()) { $(this).parents('.form--message').addClass('with_value'); }
      else { $(this).parents('.form--message').removeClass('with_value'); }
    })

  msg.each(function(){ autosize(this); })
    .on('autosize:resized', function(){
      $('.message_card__inner').css({ height: 'auto' })
    });

  $('body').on('click', function() {
    if (!msg.val()) {
      $('.form--message').removeClass("focused");
      $('.message_card__inner').removeAttr('style');
    }
  });
});

// Header

$('.btn_menu').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  $('body').addClass('body--menu_opened');
  $('.sidebar_menu').addClass('sidebar_menu--open');
});

$('.sidebar_menu, .header_search, .header').on('click', function(e) {
  e.stopPropagation();
});

$('body, .btn_close_menu, .menu_overlay, .btn_close_header').on('click', function() {
  $('body').removeClass('body--menu_opened body--search_showed');
  $('.sidebar_menu').removeClass('sidebar_menu--open');
  $('.header_search').removeClass('header_search--show');
});


// Search

$('.btn_open_search').on('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  $('body').addClass('body--search_showed');
  $('.header_search').addClass('header_search--show');
});

// Collapse

$(document).ready(function() {
  $('.panel_collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel_heading').addClass('panel_heading--active');
  });

  $('.panel_collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel_heading').removeClass('panel_heading--active');
  });
});


// b2b accelerate form
var $target;

$('.btn_show_form').on('click', function() {
  $target = $(this).data('target');

  $(this).hide();
  $($target).removeClass('hide')
});

$('.btn_close_form').on('click', function(e) {
  e.preventDefault();

  $('.btn_show_form').show();
  $($target).addClass('hide')
});