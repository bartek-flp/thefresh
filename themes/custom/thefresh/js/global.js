/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.product_sliders = {
    attach: function (context, settings) {

      $('.slider-single').not('.slick-initialized').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        adaptiveHeight: true,
        infinite: true,
        useTransform: true,
        speed: 600,
        cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
      });

      $('.slider-nav')
          .on('init', function(event, slick) {
            $('.slider-nav .slick-slide.slick-current').addClass('is-active');
          }).not('.slick-initialized')
          .slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            focusOnSelect: false,
            infinite: true,
            vertical: false,
            arrows: true,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }]
          });

      $('.slider-single').on('afterChange', function(event, slick, currentSlide) {
        $('.slider-nav').not('.slick-initialized').slick('slickGoTo', currentSlide);
        var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $('.slider-nav .slick-slide.is-active').removeClass('is-active');
        $(currrentNavSlideElem).addClass('is-active');
      });

      $('.slider-nav').on('click', '.slick-slide', function(event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data('slick-index');

        $('.slider-single').slick('slickGoTo', goToSingleSlide);
      });
      
      // Colorbox.
      //$("a[rel='example2']").colorbox();
      $('.slider-single .image a').colorbox({
        maxWidth: '95%',
        maxHeight: '95%',
        rel:function() {
          return $(this).data('rel');
        }
      });

    }
  };

  Drupal.behaviors.product_attributes = {
    attach: function (context, settings) {

      let sizeSelector = '.form-item-purchased-entity-0-attributes-attribute-thsirt-size';
      let colorSelector = '.form-item-purchased-entity-0-attributes-attribute-kolor';

      let size = $( sizeSelector + " input[checked='checked']" ).next('label').find('.field--name-name').text();
      let color = $( colorSelector + " input[checked='checked']" ).next('label').find('.field--name-name').text();
      $('.product-title .size-name').text(size);
      $('.product-title .color-name').text(color);

      // set
      let colorIsSet = false;
      $(".radio-color input").each(function(index, value) {
        if($(value).attr('checked') !== undefined ) {
          colorIsSet = true;
        }
      });

      if (!colorIsSet) {
        $(".radio-color input").each(function(index, value) {
          $(value).first().attr('checked', 'checked');
        });
      }
    }
  };

})(jQuery, Drupal);
