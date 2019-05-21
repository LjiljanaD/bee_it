import $ from 'jquery';

const loader = {
	elLoader: '[data-loader]',
	init: function() {
		this.cacheDom();
		this.render();
	},
	cacheDom: function() {
		this.$el = $(this.elLoader);
	},
	render: function() {
		$(document).ready(function() {
			loader.$el.removeClass('loading');
			loader.$el.hide();
		});
	}
};

export default loader;
