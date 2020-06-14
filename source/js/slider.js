let rehabSwiper = new Swiper('#rehab-swiper', {
  slidesPerView: '2',
  spaceBetween: 25,
  touchRatio: 1,

  navigation: {
    nextEl: '.rehab-swiper__button-next',
    prevEl: '.rehab-swiper__button-prev',
  },
  pagination: {
    el: '.rehab-swiper__swiper-pagination',
    dynamicBullets: true,
  },
  breakpoints: {
    756: {
      slidesPerView: '4',
      spaceBetween: 30,
    }
  }
});

let reviewsSwiper = new Swiper('#reviews-swiper', {
  slidesPerView: '2',
  spaceBetween: 25,
  touchRatio: 1,

  navigation: {
    nextEl: '.reviews-swiper__button-next',
    prevEl: '.reviews-swiper__button-prev',
  },
  pagination: {
    el: '.reviews-swiper__swiper-pagination',
    dynamicBullets: true,
  },
  breakpoints: {
    756: {
      slidesPerView: '2',
      spaceBetween: 30,
    }
  }
});
