// Сейчас используются 3 типа пагинации у слайдеров:
// 1) не числовая (...), динамическая
// 2) не числовая (...), не динамическая (при большом количестве слайдов
//    будет переполняться контейнер с пагинацией)
// 3) числовая (1 2 3), не динамическая

let width = $(window).width();

// максимальное число для слайдов в контейнере,
//  выше которого меняется тип пагинации слайдера
let limitForOverflow = 16;
if (width <= 750) {
  limitForOverflow = 7;
}

// объект с данными для пагинации слайдера
let paginationParam =  {};

// рендерим пагинацию для слайдера, учитывая переполнение и НЕ учитывая
//  тип числовой пагинации (которая через renderBullet)
function renderPagination(swiper_class, limitForOverflow) {

  let currentPagination = $(swiper_class+' .swiper-pagination');
  let currentSlidesLength = $(swiper_class+' .swiper-slide:not(.swiper-slide-duplicate)').length;

  paginationParam.el = currentPagination;
  paginationParam.clickable = true;

  // проверка на переполнение
  if (currentSlidesLength > limitForOverflow) {
    paginationParam.dynamicBullets = true;
  } else {
    paginationParam.dynamicBullets = false;
  }

  return paginationParam;
}

// слайдер рехабов
$(document).ready(function () {

  // локальный лимит только для этого слайдера
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

  // локальный лимит только для этого слайдера
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

// слайдер рехабов в 2 строки (с числовой пагинацией, НЕ учитывая переполнение)
$(document).ready(function () {

  let rehabSwiperTwo = new Swiper('#rehab-swiper-two-rows', {
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

// слайдеры авторов/редаторов/экспертов (с числовой пагинацией, НЕ учитывая переполнение)
$(document).ready(function () {

  let teamSwiperParam = {
    slidesPerView: '2',
    spaceBetween: 25,
    touchRatio: 1,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    },

    breakpoints: {
      756: {
        slidesPerView: '4',
        spaceBetween: 30,
      }
    }
  }

  // слайдер экспертов
  // let teamSwiperExperts = new Swiper('#team-swiper-experts', teamSwiperParam);

  // слайдер редакторов
  // let teamSwiperEditors = new Swiper('#team-swiper-editors', teamSwiperParam);

  // слайдер авторов
  // let teamSwiperAuthors = new Swiper('#team-swiper-authors', teamSwiperParam);

  // массив со всеми слайдерами экспертов/авторов, учитывая любое их количество на странице
  let teamSwiperArr = $('.team-swiper__swiper-container');
  for (let i = 0; i < teamSwiperArr.length; i++) {
    let teamSwiperID = teamSwiperArr[i].id;
    let teamSwiperCurrent = `#${teamSwiperID}`;

    teamSwiper = new Swiper (teamSwiperCurrent, teamSwiperParam);
  }
});
