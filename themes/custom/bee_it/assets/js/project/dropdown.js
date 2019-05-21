import $ from 'jquery';

const dropdown = {
	dropdownElem        : '[data-dropdown]',
	dropdownReadMoreElem: '[data-dropdown-readmore]',
	init: function() {
		this.dropdownActive();
		this.dropdownReadMore();
	},
	dropdownActive: function() {
		const dropdowns = document.querySelectorAll(dropdown.dropdownElem);
		if (dropdowns.length) {
			dropdowns.forEach((item) => item.addEventListener('click', function() {
				this.classList.toggle('dropdown--active');
			}));
		}
	},
	dropdownReadMore: function() {
		if ($(dropdown.dropdownReadMoreElem).length){
			$(dropdown.dropdownReadMoreElem).on('click', function (e) {
				e.preventDefault();
				$(this).fadeOut();
				$(this).parent().parent().find('.read-more--text').toggleClass('open');
			});
		}
	}
};

export default dropdown;
