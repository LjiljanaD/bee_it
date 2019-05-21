import $ from 'jquery';
import {loaderShow, loaderRemove, loaderSuccess, loaderFail, validationErrorsHandling, isEmail} from './../helper';

const contact = {
  init: function() {
    this.cacheDom();
    this.send();
  },

  cacheDom: function () {
    this.$el = $('.m-form');
    this.select = this.$el.find('#m-form__select');
    this.checkbox = this.$el.find('#m-form__checkbox');
    this.body = this.$el.find('#m-form__body');
    this.email = this.$el.find('#m-form__email');
    this.name = this.$el.find('#m-form__name');
    this.submit = this.$el.find('#m-form__submit');
  },

  send: function() {
    contact.submit.click(function (e) {
      e.preventDefault();
      if (contact.name.val() && contact.body.val() && contact.select.val() && isEmail(contact.email.val()) === true && contact.checkbox.is(':checked')) {
        loaderShow();
        $.ajax({
          url: "/send-contact",
          type: "post",
          data: {
            'name': contact.name.val(),
            'email': contact.email.val(),
            'body': contact.body.val()
          },
          success: function (data) {
            loaderRemove();
            if (data.success === 1) {
              loaderSuccess();
            } else if (data.success === 0) {
              validationErrorsHandling(data.errors);
            }
          },
          fail: function () {
            loaderFail();
          }
        });
      } else {
        loaderRemove();
        var errors = [];
        
        contact.name.val().length === 0 ? errors.push(contact.name[0].id) : '';
        contact.body.val().length === 0 ? errors.push(contact.body[0].id) : '';
        contact.select.val() === null ? errors.push(contact.select[0].id) : '';
        contact.checkbox.is(':checked') === false ? errors.push(contact.checkbox[0].id) : '';
        isEmail(contact.email.val()) === false ? errors.push(contact.email[0].id) : '';

        validationErrorsHandling(errors);
      }
    });
  }
};

export default contact;
