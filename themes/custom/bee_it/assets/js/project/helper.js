import $ from 'jquery';

export function loaderShow() {
	$('.m-loader').addClass('loading');
}

export function loaderRemove() {
	$('.m-loader').removeClass('loading');
}

export function loaderSuccess() {
	$('#sent-success').show();
	$('#message-sent-success').text('Your message has been sent!');
}

export function loaderFail() {
	$('.m-loader').removeClass('loading');
	$('.m-loader').hide();
	$('#scroll-to-quote').append('<h3 id="sent-fail">Something went wrong. Please try later.</h3>');
}

export function validationErrorsHandling(errors){
	$('form label').next().css('border', '1px solid #329595');
	$('form .m-form__validation').css('opacity', '0');

	$.each(errors, function (i, item){
		$('#' + item).css('border', '1px solid red');
		$('#' + item).closest('.m-form__fieldset').find('.m-form__validation').css('opacity', '1');
	});
}

export function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}
