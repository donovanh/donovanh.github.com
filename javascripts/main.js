(function(){
	
	// On load, show the bouncer
	if ($('html').hasClass('csstransitions') && $('html').hasClass('borderradius')) {
		$('.bouncer-container a').append($('#bouncer-template').html());
		var movingBouncer = $('.bouncer-container').find('.bouncer').addClass('move-bouncer');
		setTimeout(function() {
		    movingBouncer.removeClass('move-bouncer').addClass('bouncer-end-position');
		}, 2000);
		$('.bouncer-container').find('.mask').addClass('move-mask');
	} else {
		$('.bouncer-container').addClass('old');
	}
	
}());