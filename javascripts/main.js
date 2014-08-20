// On load, show the bouncer
$(window).ready(function() {
    checkAndShowBouncer();

    if ($('.video-wrapper').length) {
        // Listen for page size and write video size appropriately
        resizeVideoTo80Percent();
        $(window).bind("resize", resizeVideoTo80Percent);
    }

    if ($('.project').length) {
        setInterval(function() { rotateProjectImages(); }, 10000);
    }

    var $body    = $('html, body'), // Define jQuery collection 
    content  = $('#main').smoothState({
        onStart : {
          duration: 400,
          render: function () {
            content.toggleAnimationClass('is-exiting');
          }
        },
        callback : function(url, $container, $content) {
            checkAndShowBouncer();
        } 
    }).data('smoothState');
});

function checkAndShowBouncer() {
    if ($('html').hasClass('csstransitions') && $('html').hasClass('borderradius') && !$('html').hasClass('no-js')) {
        showBouncer();
    } else {
        $('html').addClass('no-js');
    }
}

function resizeVideoTo80Percent() {
    if ($(window).width() < 720) {
        var videoWidth = $(window).width() * 0.8;
        var videoHeight = $(window).width() * 0.50;
        $('.video-wrapper').width(videoWidth);
        $('.video-wrapper iframe').width(videoWidth).height(videoHeight);
    } else {
        $('.video-wrapper').width(720);
        $('.video-wrapper iframe').width(720).height($('.video-wrapper iframe').attr('data-height'));
    }
}

function showBouncer() {
    $('.bouncer-container a').append($('#bouncer-template').html());
    var movingBouncer = $('.bouncer-container').find('.bouncer').addClass('move-bouncer');
    setTimeout(function() {
        movingBouncer.removeClass('move-bouncer').addClass('bouncer-end-position');
    }, 2000);
    $('.bouncer-container').find('.mask').addClass('move-mask');
}

function rotateProjectImages() {
    $('.image').each(function(i, set) {
        $(set).find('a').each(function(i, image) {
            if (!$(image).hasClass('away')) {
                $(image).addClass('away');
                // Find the next image
                if (i < $(image).parent().find('a').length -1) {
                    $(image).next().removeClass('away');
                } else {
                    $(image).parent().find('a').first().removeClass('away');
                }
                return false;
            }
        });
    });
}

// if ($('.email-signup').length > 0) {
//     $(window).scroll(function() {
//        if(($(window).scrollTop() + $(window).height() >= $(document).height() - 360) && !$('.email-signup').hasClass('activate')) {
//            $('.email-signup').addClass('activate');
//        }
//     });
// }


