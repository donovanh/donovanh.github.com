(function(){
	
	// On load, show the bouncer
	if (!$('html').hasClass('no-js')) {
		$('.bouncer-container').append($('#bouncer-template').html());
		$('.bouncer-container').find('.bouncer').addClass('move-bouncer');
		$('.bouncer-container').find('.mask').addClass('move-mask');
	}
	
}());