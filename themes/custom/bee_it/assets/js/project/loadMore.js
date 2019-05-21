import $ from 'jquery';

const loadMore = {
	elBox   : '[data-load-box]',
	elButton: '[data-load-more]',
	init: function() {
		this.cacheDom();
		this.bindEvents();
		this.render();
	},
	cacheDom: function() {
		this.$el     = $(this.elBox);
		this.$button = $(this.elButton);
	},
	render: function() {
		if (this.$el.length > 2) {
			$(this.elBox+":nth-child(n+3)" ).css( "display", "none" );
			this.$el.slice(0, 3).show();
		}
	},
	bindEvents: function() {
		this.$button.on('click', this.loadMoreItems.bind(this));
	},
	loadMoreItems: function(e) {
		e.preventDefault();
		$(this.elBox+":hidden").slice(0, 3).slideDown();
		if($(this.elBox+":hidden").length == 0) {
			this.$button.hide();
		}
	}
};

export default loadMore;
