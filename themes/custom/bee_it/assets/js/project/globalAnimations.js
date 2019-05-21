import ScrollMagic from 'scrollmagic'
import $ from 'jquery';

import { TweenMax, TimelineLite } from 'gsap'

import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'

const globalAnimations = {
    fadeAnimation: '[data-animation-fade]',
    triggerFadeAnimation: '[data-trigger-fade]',
    init: function() {
        this.scrollFade();
    },
    
    scrollFade: function() {
        
        // init controller
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var controller = new ScrollMagic.Controller();
        const getPostElements = Array.from(document.querySelectorAll(globalAnimations.fadeAnimation));
        
        if (getPostElements.length > 0) {
            
            const tween = TweenMax.staggerFromTo(getPostElements, 1, { y: -15, opacity: 0 }, {y: 0, opacity: 1}, 0.15);
            
            let reverseStatus = false;
            let sceneSettings = {
                triggerElement: globalAnimations.triggerFadeAnimation,
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

export default globalAnimations;
