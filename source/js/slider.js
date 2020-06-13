var centerSwiper = new Swiper('#rehab-swiper', {
  slidesPerView: '2',
  spaceBetween: 25,
  touchRatio: 1,
  navigation: {
    nextEl: '.rehab-swiper__button-next',
    prevEl: '.rehab-swiper__button-prev',
  },
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   draggable: true,
  // },
  breakpoints: {
    756: {
      slidesPerView: '4',
      spaceBetween: 30,
    }
  }
});
