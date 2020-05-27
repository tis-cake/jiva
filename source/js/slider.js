var centerSwiper = new Swiper('#swiper', {
  slidesPerView: '2',
  spaceBetween: 25,
  touchRatio: 1,
  navigation: {
    nextEl: '.swiper__button-next',
    prevEl: '.swiper__button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  breakpoints: {
    756: {
      slidesPerView: '4',
      spaceBetween: 30,
    }
  }
});
