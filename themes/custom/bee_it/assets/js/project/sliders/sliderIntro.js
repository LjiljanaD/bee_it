import $ from 'jquery';
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
//or get to the parts that aren't included inside TweenMax:
import Draggable from "gsap/Draggable";

const sliderTechnologies = {
	sliderElem: '.js-swiper-team',
	currentSlide: 1,
	calc: 0,
	slideRange: function() {
		return Math.round(sliderTechnologies.currentSlide / (sliderTechnologies.slides.length - 1) * 100);
	},
	cacheDOM : function () {
		this.swiperTeam  = $('.swiper-team');
		this.slider  = this.swiperTeam.find('.js-swiper-team');
		this.slideContainer  = this.swiperTeam.find('.js-swiper-team__slides');
		this.slides  = this.swiperTeam.find('.js-swiper-team__slide');
		this.progressBar  = this.swiperTeam.find('.js-swiper-team__progress');
		this.progressBarHandler  = this.swiperTeam.find('.js-swiper-team__progress-handler');
		this.progressBarLabel  = this.swiperTeam.find('.js-swiper-team__progress-label');
	},
	init: function() {

		// configuration
		const width = 720;
		const pause = 2500;
		const animationSpeed = 1000;

		let interval;

		this.cacheDOM();
		const childrenCount = sliderTechnologies.slideContainer[0].childElementCount;

		this.slideContainer.css({'width': childrenCount * width });

		function startSlider() {
			interval = setInterval(function () {

				sliderTechnologies.calc = sliderTechnologies.slideRange();

				TweenLite.to(sliderTechnologies.slideContainer[0], 1 , {
					marginLeft: '-=' + width,
					ease: Power4.easeInOut,
					onComplete: function(){

						sliderTechnologies.currentSlide++;

						if (sliderTechnologies.currentSlide === sliderTechnologies.slides.length) {

							// set to first slide
							sliderTechnologies.currentSlide = 1;
							sliderTechnologies.calc = 0;
							sliderTechnologies.slideContainer.css('margin-left', 0);
							sliderTechnologies.progressBar
							.animate({'background-size': sliderTechnologies.calc + '%'}, animationSpeed)
							.attr('aria-valuenow', sliderTechnologies.calc);

							sliderTechnologies.progressBarLabel
							.text(sliderTechnologies.calc + '% completed');

							sliderTechnologies.progressBarHandler
							.animate({
								'left': sliderTechnologies.calc + '%',
								'transform': 'translateX(-'+ sliderTechnologies.calc +'%)'
							}, animationSpeed);
						}
					}
				});

				sliderTechnologies.progressBar
				.animate({'background-size': sliderTechnologies.calc + '%'}, animationSpeed)
				.attr('aria-valuenow', sliderTechnologies.calc);

				sliderTechnologies.progressBarLabel
				.text(sliderTechnologies.calc + '% completed');

				sliderTechnologies.progressBarHandler
				.animate({
					'left': sliderTechnologies.calc + '%',
					'transform': 'translateX(-'+ sliderTechnologies.calc +'%)'
				}, animationSpeed);

			}, pause);
		}


		sliderTechnologies.progressBarHandler.on('click', function (e) {
			stopSlider();
			sliderTechnologies.currentSlide;
		});

		sliderTechnologies.progressBarHandler.on('mouseleave', function (e) {
			startSlider();
		});

		function stopSlider() {
			clearInterval(interval);
		}

		sliderTechnologies.slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);

		startSlider();
	},

};

export default sliderTechnologies;
