$(document).ready(function(){

    $(window).scroll(function() {
        if ($(window).scrollTop() > 1) {
            $('.men-header').addClass('fixed-header');

        } else {
            $('.men-header').removeClass('fixed-header');
        }

    });

    // Counter Js
/*
    $('.counter').counterUp({
        delay: 10,
        time: 2000
    });*/

    // Testimonial JS

    $('.test-slider').slick({
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });

})

// Toggle list

$(document).ready(function(){
    $('.filter-heding').click(function(){
        $(this).next('.filter-body').slideToggle();
        $(this).toggleClass('active');
    });
});

// Uncheck all checkboxe

$(function() {
    $('.reset-check').on('click', function() {
        $('input.pc-checkbox:checkbox').prop('checked', false);
    });
});


// Subject Tabbing

$(document).ready(function(){

    $('.subj-list li a').click(function(e){
        e.preventDefault();
        var tab_id = $(this).attr('data-tab');

        $('.subj-list li a').removeClass('active');
        $('.sbuj-detals').removeClass('active');

        $(this).addClass('active');
        $("#"+tab_id).addClass('active');
    })

})

$( "#myModal form" ).submit(function( event ) {
    event.preventDefault();
    $('#myModal').modal("hide");
    $('#myModal2').modal("show");
});

$('.mobile-menu').click(function(){
    $(this).toggleClass('active');
    $('.collapse-menu').toggleClass('active');
})
$('.close-menu').click(function(){
    $('.collapse-menu').removeClass('active');
})

// Filter Course

$('.cuorsefilter-btn').click(function(){
    $('.filter-sidbar').toggleClass('active');
})
$('.apply-filter').click(function(){
    $('.filter-sidbar').removeClass('active');
})
