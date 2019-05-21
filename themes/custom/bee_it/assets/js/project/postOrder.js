import ScrollMagic from 'scrollmagic'
import $ from 'jquery';

import { TweenMax, TimelineLite } from 'gsap';

import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';

const postOrder = {
	postElem: '[post-animate]',
	postTrigger: '[post-animate-trigger]',
	init: function() {
        const elementExists = document.querySelector(postOrder.postElem) !== null;
        
        if (elementExists) {
			this.animationActive();
			
			$(window).load(function(){
				postOrder.hoverPost();
			});
        }
	},
	hoverPost: function () {
		$(postOrder.postElem).each(function (index, element){

			var tl = new TimelineLite({
				paused:true
			});

			tl.fromTo(element, .3, {
					boxShadow: '0 8px 17px 2px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)'
				}, {
					y: -1,
					ease: Power0.easeNone, scale: 1.05,
					boxShadow: '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -7px rgba(0,0,0,0.2)'
				});

			element.animation = tl;

		});

		$(postOrder.postElem).mouseenter(function(){
			this.animation.play();
		});

		$(postOrder.postElem).mouseleave(function(){
			this.animation.reverse();
		});

	},
	animationActive: function() {
		
		// init controller
		var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var controller = new ScrollMagic.Controller();
		const getPostElements = Array.from(document.querySelectorAll(postOrder.postElem));
		
		if (getPostElements.length > 0) {
			
			const tween = TweenMax.staggerFromTo(getPostElements, 1, { y: -15, opacity: 0 }, {y: 0, opacity: 1}, 0.15);
			
			let reverseStatus = false;
			let sceneSettings = {
				triggerElement: postOrder.postTrigger,
			};
			
			if (windowWidth < 992) {
				sceneSettings = {
					...sceneSettings,
					duration: 250,
					offset: -100
				}
			}

			// create a scene
			var scene = new ScrollMagic.Scene(sceneSettings);

			scene.setTween(tween)
				.reverse(reverseStatus)
				.addTo(controller);
		}
	},
};

export default postOrder;
