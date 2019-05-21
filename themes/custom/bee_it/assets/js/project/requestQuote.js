import { TweenMax, TimelineLite } from 'gsap'
import $ from 'jquery';

const requestQuote = {
	formElem: '.m-form',
    textElem: '[data-form-text-toggle]',
    labelElem: '[data-label-fancy]',
    inputElem: '[data-input-focus]',
    selectElem: '[data-select-focus]',
	init: function() {
        const elementExists = document.querySelector(requestQuote.formElem) !== null;
        
        if (elementExists) {
	        this.cacheDom();
			this.animate();
	        this.bindEvents();
        }
	},
    cacheDom: function () {
        this.$formElem = $(this.formElem);
        this.$textElem = this.$formElem.find(this.textElem);
        this.$labelElem = this.$formElem.find(this.labelElem);
        this.$inputElem = this.$formElem.find(this.inputElem);
        this.$selectElem = this.$formElem.find(this.selectElem);
    },
    bindEvents: function () {
        $(requestQuote.$labelElem).on('click', this.moveLabelHandler.bind(this));
		
        $(requestQuote.$inputElem).on('focusout', this.inputBlurHandler.bind(this));
        $(requestQuote.$inputElem).on('focusin', this.inputFocusInHandler.bind(this));
		
        $(requestQuote.$textElem).on('focusout', this.textareaHandler.bind(this));
        $(requestQuote.$textElem).on('focusin', this.textareaFocusInHandler.bind(this));
		
        // $(requestQuote.$selectElem).on('focusin', this.selectFocusInHandler.bind(this));
        // $(requestQuote.$selectElem).on('focusout', this.selectBlurHandler.bind(this));
    },
    moveLabelHandler: function (e) {
        e.preventDefault();
        e.target.nextElementSibling.focus();
		e.target.dataset.animated = 'true';
		
        TweenMax.fromTo(e.target, .2, { y: 40, fontSize: 16 },  {y: 17, fontSize: 12});
        
        if (e.target.parentElement.lastElementChild.nodeName === "TEXTAREA") {
            requestQuote.textareaHandler(e);
        }
		
		if (e.target.nextElementSibling.nodeName=== 'SELECT') {
			// debugger;
			const getFirst = e.target.nextElementSibling[0];
		}
        
    },
    textareaHandler: function (e) {
        // TweenMax.to(requestQuote.$textElem, .2, { height: '66px' });
        if (e.type === 'focusout' && e.target.value === '') {
            // TweenMax.to(requestQuote.$textElem, .2, { height: '66px' });
            TweenMax.to(e.target.parentElement.querySelector('label'), .2, {y: 40, fontSize: 16});
        }
    },
    inputBlurHandler: function (e) {
        e.preventDefault();
        if (e.target.value !== '') return;
        
        TweenMax.to(e.target.previousElementSibling, .2, {y: 40, fontSize: 16});
    },
	inputFocusInHandler: function (e) {
        e.preventDefault();
        if (e.target.value === '') {
        	TweenMax.to(e.target.previousElementSibling, .2, {y: 17, fontSize: 12});
		};
	},
	// selectFocusInHandler: function (e) {
    //     e.preventDefault();
    //     if (e.target.value === '') {
	// 		e.target.children('option').each(function() {
	//             if ($(this).is(':selected'))
	//             { $(this).trigger('change');  }
	//         });
    //     	TweenMax.to(e.target.previousElementSibling, .2, {y: 17, fontSize: 12});
	// 	};
	// },
    // selectBlurHandler: function (e) {
    //     e.preventDefault();
    //     if (e.target.value !== '') return;
	// 
    //     TweenMax.to(e.target.previousElementSibling, .2, {y: 40, fontSize: 16});
    // },
	textareaFocusInHandler: function (e) {
        e.preventDefault();
        if (e.target.value === '') {
        	TweenMax.to(e.target.previousElementSibling, .2, {y: 17, fontSize: 12});
        	// TweenMax.to(requestQuote.$textElem, .2, { height: '66px' });
		};
	},
	animate: function() {
        TweenMax.to(requestQuote.formElem, 1.5, {"opacity":1, "scale":"1", ease: Power4.easeInOut, delay: 1.75});
	},

};

export default requestQuote;
