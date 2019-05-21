import { TweenMax, TimelineLite, TimelineMax, DrawSVGPlugin } from 'gsap/all'


const logo = {
    lettersIT: '#logo-it',
    letterB: '#logo-letter-b',
    beeB: '#bee-body',
    beeW: '#bee-wings',
    init: function() {
        this.animationActive();
    },
    animationActive: function() {
        const wingsFlapTl = new TimelineMax({repeat: 30});
            wingsFlapTl.fromTo(logo.beeW, 0.1, { opacity: 0 }, { opacity: 1 });  
        const tl = new TimelineMax();
            tl.fromTo(logo.beeB, 1 , { x: -100 }, { x: 0 }, 0.5);       
    },
};

export default logo;
