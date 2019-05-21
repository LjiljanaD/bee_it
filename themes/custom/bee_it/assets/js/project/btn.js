import $ from 'jquery';

const btn = {
  init: function() {
    this.cacheDom();
    this.active();
    this.setSession();
    this.toggle();
  },
  cacheDom: function () {
    this.$btn = $('.btn');
    this.$btnContact = $('.btn-contact');
    this.$form = $('#contact-form-toggle');
    this.$btnToggle = $('.btn-contact-toggle');
  },
  active: function functionName() {
    // Mobile iphone btn class
    this.$btn.on('click', function () {
      $(this).toggleClass('active');
    });
  },
  setSession: function() {
    btn.$btnContact.click(function(e) {
      localStorage.setItem("contactClicked", 1);
    });
  },
  toggle: function() {
    if(localStorage.getItem("contactClicked") === "1") {
      btn.$form.show();
      localStorage.removeItem("contactClicked");
    }
    else {
      btn.$form.hide();
    }
  },
  contactToggle: function () {
    btn.$btnToggle.on('click', function (e) {
         e.preventDefault();
         btn.$form.slideToggle(500);
     });

  }
};

export default btn;
