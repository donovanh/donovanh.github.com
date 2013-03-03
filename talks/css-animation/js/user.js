$(function() {
    var comparisonInterval = '';

    $( "#accordion" ).accordion();

    // Slide 2
    $('#js-button').hover(function(e) {
        $(e.target).animate({padding: '30px 50px', backgroundColor: 'red'}, 500);
    },
    function(e) {
        $(e.target).animate({padding: '12px 20px', backgroundColor: 'green'}, 500);
    });

    // Slide 3
    $('#css-accordion h3').click(function(e) {
        if (!$(e.target).hasClass('active')) {
            $('#css-accordion .item').removeClass('active');
            $(e.target).parent().addClass('active');
        }
    });

    Reveal.addEventListener( 'comparison', function() {
        animateLetters();
        comparisonInterval = setInterval(function() {animateLetters();}, 2000);
    });

    Reveal.addEventListener( 'clear-comparison', function() {
        window.clearInterval(comparisonInterval)
    });

    function animateLetters() {
        $('.js-example div').stop().animate({top: '150px', opacity: '0.2'}, 1000, function() {
            $('.js-example div').stop().animate({top: '0', opacity: '1'}, 1000);
        });
    }
});