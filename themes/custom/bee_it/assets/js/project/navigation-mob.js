import { TweenMax, TimelineLite } from 'gsap'
import $ from 'jquery';

const navigation = {
	btnElem: '.btn',
	navElem: '.m-nav',
	navLink: '.m-nav__item-link',
	itemElem: '[data-nav-item]',
	init: function() {
		
		const elementExists = document.querySelector(navigation.navElem) !== null;
		
		if (elementExists) {
			
			this.hamburgerActive();
			this.cacheDOM();
			this.hoverItems();
			this.scrollPage();
		}
		
	},
	
	hoverItems: function () {
		$(navigation.itemElem).each(function (index, element){
			var tl = new TimelineLite({
				paused:true
			});
			tl.to(element, 0.15, {scale: 1})
			.to(element, 0.2, { scale: 1.1 })
			element.animation = tl;
		});
		
		$(navigation.itemElem).mouseenter(function(){
			this.animation.play();
		});
		
		$(navigation.itemElem).mouseleave(function(){
			this.animation.reverse();
		});
	},
	
	
	hamburgerActive: function() {
		
		$('.m-hamburger').click (function(){
			const tl = new TimelineLite({ onReverseComplete: reverseFunction });
			const getMainNav = $('#js-navbar-collapse');
			tl.staggerFromTo(navigation.getNavElements, 1, {  y: -25, opacity: 0 }, { ease: Expo.easeOut, y: 0, opacity: 1}, 0.05);
			
			function reverseFunction( ){
				$('.m-hamburger').toggleClass('open');
				getMainNav.toggleClass('m-nav-flex');
				$('body').toggleClass('js-body--fixed');
			}
			
			if (this.classList.value.includes('open')) {
				tl.reverse(-0.5, true)
			} else {
				$(this).toggleClass('open');
				getMainNav.toggleClass('m-nav-flex');
				$('body').toggleClass('js-body--fixed');
				tl.play();
			}
		});
	},
	
	scrollPage: function () {
    	const windowWidth = $(window).width();
		if ($(window).scrollTop() > 40) {
		  $('.b-navbar').addClass('js-nav--scroll');
	  	}
		
    	if ( windowWidth > 992) {
			$( window ).scroll(function() {
				if ($(window).scrollTop() > 40) {
				  $('.b-navbar').addClass('js-nav--scroll');
			  } else {
				  $('.b-navbar').removeClass('js-nav--scroll');
			  }
			});
		}
	},
	
	cacheDOM: function () {
		this.getNavElements = Array.from(document.querySelectorAll(navigation.itemElem));
	}
};

export default navigation;
