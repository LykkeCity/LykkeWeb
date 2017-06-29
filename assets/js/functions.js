var wH = $(window).height(),
  wW = $(window).width(),
  ua = navigator.userAgent,
  touchendOrClick = (ua.match(/iPad|iPhone|iPad/i)) ? "touchend" : "click",

  deviceAgent = navigator.userAgent.toLowerCase(),
  isMobile = deviceAgent.match(/(iphone|ipod|ipad)/);

FastClick.attach(document.body);

if (isMobile || wW <= 767) {
  $('body').addClass('is_mobile');
} else {
  $('body').removeClass('is_mobile');
}

function initResize() {
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
}

function initEventsOnClick() {
  $('[data-control="select"] ._value').text($(this).siblings('select').val());
  $('[data-control="select"] select').on('change', function() {
    $(this).siblings('.select__value').find('._value').text(this.value);
  });

  $('.action_follow').on('click', function() {
    $(this).toggleClass('active')
  });

  // Tel
  if (!isMobile) {
    $('body').on('click', 'a[href^="tel:"]', function() {
      $(this).attr('href',
        $(this).attr('href').replace(/^tel:/, 'callto:'));
    });
  }
}

function initEventsOnScroll() {
  $(window).scroll(function() {

    var scrollPosition = $(window).height() + $(window).scrollTop(),
        visibleArea = $(document).height() - $('.footer').outerHeight(),
        limit = 20;

    if(scrollPosition > visibleArea + limit) {
      $('body').addClass('footer_in_view').find('#launcher, .btn_feedback').css({
        bottom: $('.footer').outerHeight()
      });
    }

    else {
      $('body').removeClass('footer_in_view').find('#launcher, .btn_feedback').css({
        bottom: 0
      })
    }
  }).trigger('scroll');
}

// Messages

function initMessages() {
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
}

// Header

function initHeader() {
  if (isMobile || wW <= 768) {
    $('.header_nav .nav_list__item > a').on('click', function(e) {
      e.stopPropagation();

      var href = $(this).attr('href');

      if (!$(this).parent('.nav_list__item').hasClass('nav_list__item--selected')) {
        $('.header_nav').addClass('header_nav--selected');
        $('.header_nav .nav_list__item').removeClass('nav_list__item--selected');
        $(this).parent('.nav_list__item').addClass('nav_list__item--selected');
        e.preventDefault();
      } else {
        return true;
      }
    });

  } else {
    hideSubMenu();
  }

  $('.btn_menu').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('body').addClass('body--menu_opened');
    $('.sidebar_menu').addClass('sidebar_menu--open');
  });

  $('.sidebar_menu, .header_search').on('click', function(e) {
    e.stopPropagation();
  });

  $('body, .btn_close_menu, .menu_overlay, .btn_close_header').on('click', function() {
    $('body').removeClass('body--menu_opened body--search_showed');
    $('.sidebar_menu').removeClass('sidebar_menu--open');
    $('.header_search').removeClass('header_search--show');
    hideSubMenu();
  });

  $('.btn_open_search').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $('body').addClass('body--search_showed');
    $('.header_search').addClass('header_search--show');
  });
}

function hideSubMenu() {
  $('.header_nav').removeClass('header_nav--selected');
  $('.nav_list__item').removeClass('nav_list__item--selected');
}

// Collapse

function initCollapse() {
  $('.panel_collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel_heading').addClass('panel_heading--active');
  });

  $('.panel_collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel_heading').removeClass('panel_heading--active');
  });
}


// b2b accelerate form

function initForms() {
  var $target,
    hash = window.location.hash;

  if (window.location.hash) {
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 0);

    $target = hash;

    $(hash).removeClass('hide');
    $('.btn_show_form').hide();
  }

  $('.btn_show_form').on('click', function() {
    $target = $(this).data('target');

    $(this).hide();
    $($target).removeClass('hide')
  });

  $('.btn_close_form').on('click', function() {
    $('.btn_show_form').show();
    $($target).addClass('hide');
  });

}


// Smooth scroll

function initSmoothScroll() {
  $('.smooth_scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}



// Affix

function initAffix() {
  $('.btn_affix').affix({
    offset: {
      top: function () {
        return (this.top =  $('.site_nav').offset().top - $('.header_container').outerHeight())
      }
    }
  });

  $(window).resize(function() {
    $('.btn_affix').css({
      right: $('.header .container').offset().left + 15
    })
  }).trigger('resize')
}

function initStickyNav() {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navHeight = $('.header_nav').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    if (st > lastScrollTop && st > navHeight){
      // Scroll Down
      hideSubMenu();
      $('.header_nav, .header, .btn_affix')
        .removeClass('nav_down')
        .addClass('nav_up');
    } else {
      // Scroll Up
      hideSubMenu();
      if(st + $(window).height() < $(document).height()) {
        $('.header_nav, .header, .btn_affix')
          .removeClass('nav_up')
          .addClass('nav_down')
      }
    }

    lastScrollTop = st;
  }

  $(window).resize(function() {
    setTimeout(function() {
      $('.header_nav').css({
        paddingTop: $('.header').outerHeight()
      });
    }, 30)
  }).trigger('resize');
}

// Init

$(document).ready(function() {
  initResize();
  initEventsOnClick();
  initEventsOnScroll();
  initMessages();
  initHeader();
  initStickyNav();
  initCollapse();
  initForms();
  initSmoothScroll();
  initAffix();
});

