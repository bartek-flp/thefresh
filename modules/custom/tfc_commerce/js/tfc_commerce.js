/**
 * @file
 * Commerce utilities.
 *
 */
(function ($, Drupal) {

    'use strict';

    Drupal.behaviors.product_attributes = {
        attach: function (context, settings) {

            let checkbox = '.copy-it';
            let shippingContainer = '.checkout-pane-shipping-information';
            let paymentContainer = '.checkout-pane-payment-information';
            let fields = [
                'given-name',
                'family-name',
                'address-line1',
                'address-line2',
                'postal-code',
                'locality',
                'text-full',
            ];

            $(checkbox, context).change(function() {
                if(this.checked) {
                    $.each(fields, function( index, value ) {
                        $(paymentContainer + ' .' + value ).val($(shippingContainer + ' .' + value).val());
                    });
                }
                else {
                    $.each(fields, function( index, value ) {
                        $(paymentContainer + ' .' + value).val('');
                    });
                }
            });

            $(checkbox).attr('check', 'is-not');
            $(checkbox, context).change(function() {
                if (this.checked) {
                    $(this).attr('check', 'is');
                } else {
                    $(this).attr('check', 'is-not');
                }

            });

            $.each(fields, function( index, value ) {
                $(shippingContainer + ' .' + value).keyup(function(event) {
                    if ($(checkbox).attr('check') == 'is') {
                        $(paymentContainer + ' .' + value).val($(this).val());
                    }
                });
            });
        }
    };

    Drupal.behaviors.slick_slider = {
        attach: function (context, settings) {

            let slideIt = '.paragraph--type--slider .slider .slider-items'

            $(slideIt).slick({
                infinite: true,
                speed: 2000,
                autoplay: true,
                autoplaySpeed: 2000,
                fade: true,
                cssEase: 'linear'
            });

        }
    };

})(jQuery, Drupal);
