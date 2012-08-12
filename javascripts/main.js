(function(){
	// On load, show the bouncer
	if ($('html').hasClass('csstransitions') && $('html').hasClass('borderradius') && !$('html').hasClass('no-js')) {
		if ($('header#404').length > 0) 
			show404Bouncer();
		else
			showBouncer();
	} else {
		$('html').addClass('no-js');
	}
}());

function showBouncer() {
	$('.bouncer-container a').append($('#bouncer-template').html());
	var movingBouncer = $('.bouncer-container').find('.bouncer').addClass('move-bouncer');
	setTimeout(function() {
	    movingBouncer.removeClass('move-bouncer').addClass('bouncer-end-position');
	}, 2000);
	$('.bouncer-container').find('.mask').addClass('move-mask');
}

function show404Bouncer() {
	// Set the initial content
	var old404Heading = $('#404').html();
	var old404Content = $('.entry').html();
	$('#404').html('<h1>Sure thing, just this way...</h1><p class="date">Loading...</p>');
	$('.entry').html('Let\'s just see about finding that page now.<br><br><br>');
	
	$('.bouncer-container a').append($('#bouncer-template').html());
	var movingBouncer = $('.bouncer-container').find('.bouncer').addClass('move-bouncer-404');
	setTimeout(function() {
		$('#404').html('<h1>Oh, wait...</h1><p class="date">Loading...</p>');
	}, 2800);
	setTimeout(function() {
	  movingBouncer.removeClass('move-bouncer-404').addClass('bouncer-float-up');
		setTimeout(function() {
			movingBouncer.removeClass('bouncer-float-up').addClass('bouncer-end-position-404');
			$('#404').hide().html(old404Heading).fadeIn('fast');
			$('.entry').hide().html(old404Content).fadeIn('fast');
		}, 1000);
	}, 4000);
	
}
