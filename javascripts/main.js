// On load, show the bouncer
if ($('html').hasClass('csstransitions') && $('html').hasClass('borderradius') && !$('html').hasClass('no-js')) {
    showBouncer();
} else {
    $('html').addClass('no-js');
}

if ($('.video-wrapper').length > 0) {
    // Listen for page size and write video size appropriately
    resizeVideoTo80Percent();
    $(window).bind("resize", resizeVideoTo80Percent);
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

// if ($('.email-signup').length > 0) {
//     $(window).scroll(function() {
//        if(($(window).scrollTop() + $(window).height() >= $(document).height() - 360) && !$('.email-signup').hasClass('activate')) {
//            $('.email-signup').addClass('activate');
//        }
//     });
// }


