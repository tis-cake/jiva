let rehabSwiper = new Swiper('#rehab-swiper', {
  slidesPerView: '2',
  spaceBetween: 25,
  touchRatio: 1,
  // speed: 1000,

  navigation: {
    nextEl: '.rehab-swiper__button-next',
    prevEl: '.rehab-swiper__button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
  breakpoints: {
    756: {
      slidesPerView: '4',
      spaceBetween: 30,
    }
  }
});
