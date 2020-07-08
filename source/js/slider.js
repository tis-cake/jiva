let width = $(window).width();

// максимальное число для слайдов в контейнере,
//  выше которого меняется тип пагинации слайдера
var limitForOverflow = 16;
if (width <= 750) {
  limitForOverflow = 7;
}

// объект с данными для пагинации слайдера
let paginationParam =  {};

function renderPagination(swiper_class, limitForOverflow) {

  let currentPagination = $(swiper_class+' .swiper-pagination');
  let currentSlidesLength = $(swiper_class+' .swiper-slide:not(.swiper-slide-duplicate)').length;

  paginationParam.el = currentPagination;
  paginationParam.clickable = true;
  if (currentSlidesLength > limitForOverflow) {
    paginationParam.dynamicBullets = true;
  } else {
    paginationParam.dynamicBullets = false;
  }

  return paginationParam;
}

// слайдер рехабов
$(document).ready(function () {

  // limitForOverflow = 16;

  renderPagination('.rehab-swiper', limitForOverflow);

  let rehabSwiper = new Swiper('#rehab-swiper', {
    slidesPerView: '2',
    spaceBetween: 25,
    touchRatio: 1,

    navigation: {
      nextEl: '.rehab-swiper__button-next',
      prevEl: '.rehab-swiper__button-prev',
    },
    pagination: paginationParam,
    // pagination: {
    //   el: '.rehab-swiper__swiper-pagination',
    //   clickable: true,
    //   dynamicBullets: true,
    // },

    breakpoints: {
      756: {
        slidesPerView: '4',
        spaceBetween: 30,
      },
      550: {
        slidesPerView: '3',
        spaceBetween: 30,
      }
    }
  });
});

// слайдер отзывов
$(document).ready(function () {

  // limitForOverflow = 10;

  renderPagination('.reviews-swiper', limitForOverflow);

  let reviewsSwiper = new Swiper('#reviews-swiper', {
    slidesPerView: '1',
    spaceBetween: 25,
    touchRatio: 1,

    navigation: {
      nextEl: '.reviews-swiper__button-next',
      prevEl: '.reviews-swiper__button-prev',
    },

    pagination: paginationParam,

    breakpoints: {
      756: {
        slidesPerView: '2',
        spaceBetween: 30,
      }
    }
  });
});

// слайдер рехабов в 2 строки
$(document).ready(function () {

  let rehabSwiper = new Swiper('#rehab-swiper-two-rows', {
    slidesPerView: '2',
    slidesPerColumn: '4',
    slidesPerColumnFill: 'row',

    spaceBetween: 25,
    touchRatio: 1,

    navigation: {
      nextEl: '.rehab-swiper__button-next',
      prevEl: '.rehab-swiper__button-prev',
    },
    pagination: {
      el: '.rehab-swiper__swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    },

    breakpoints: {
      756: {
        slidesPerView: '4',
        slidesPerColumn: '2',
        spaceBetween: 30,
      },
      550: {
        slidesPerView: '3',
        slidesPerColumn: '2',
        spaceBetween: 30,
      }
    }
  });
});
