import $ from 'jquery';
import {loaderShow, loaderRemove, loaderSuccess, loaderFail, validationErrorsHandling, isEmail} from './../helper';

const newsletter = {
    init: function() {
        this.cacheDom();
        this.send();
    },

    cacheDom: function () {
        this.$el = $('.m-form');
        this.email = this.$el.find('#m-form__email');
        this.submit = this.$el.find('#m-form__submit');
    },

    send: function() {

        newsletter.submit.click(function (e) {
            e.preventDefault();

            if (isEmail(newsletter.email.val()) === true) {
                loaderShow();
                $.ajax({
                    url: "/send-contact",
                    type: "post",
                    data: {
                        'email': newsletter.email.val(),
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
                debugger;

                isEmail(newsletter.email.val()) === false ? errors.push(newsletter.email[0].id) : '';

                validationErrorsHandling(errors);
            }
        });
    }
};

export default newsletter;
