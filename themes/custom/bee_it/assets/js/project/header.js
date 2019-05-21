import { TweenMax, TimelineLite } from 'gsap'

const header = {
    headerElem: '[intro-animate]',
    init: function() {
        const elementExists = document.querySelector(header.headerElem) !== null;
        
        if (elementExists) {
            this.animationActive();
        }
    },
    animationActive: function() {
        const getHeaderElem = document.querySelector(header.headerElem);
        const tl = new TimelineLite();
        tl.fromTo(getHeaderElem, 1 , { y: 100, opacity: 0 }, {y: 0, delay: 1, opacity: 1}, 0.5);
    },
};

export default header;
