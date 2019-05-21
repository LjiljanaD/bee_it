import $ from 'jquery';
import 'slick-carousel';

const sliderWhyUs = {
    sliderElem: '.js-slider--why-us',
    leftSide: '.b-slider__left-side',
    helpLayout: '.js-help__layout',
    init: function() {
        const $slider = $(sliderWhyUs.sliderElem);
        
        if ($slider.length) {
            
            $slider.slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                prevArrow: ".slick-arrow--prev",
                nextArrow: ".slick-arrow--next",
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
            
            updateOffsetLeft();
            
            $(window).on('resize', function functionName() {
                updateOffsetLeft();
            })
        }
        
        function updateOffsetLeft() {
            var containerOffset = $(sliderWhyUs.helpLayout).offset().left;
            var leftSideContainer = $(sliderWhyUs.leftSide);
            
            leftSideContainer.css({ 'padding-left': containerOffset });
        }
    },
    
};

export default sliderWhyUs;
