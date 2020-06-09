// кастомный language-select
$('.custom-select-js').customSelect();
$('.custom-select').length != 0 ? $('.select-lang').addClass('custom') : $('.select-lang').removeClass('custom');

$('.search-toggle').click(function() {
  $(this).toggleClass('active');
  $(this).blur();
  $('.main-nav__list').toggleClass('search-active');
  $('.search').toggleClass('active');

  if($('.search').hasClass('active')) {
    $('.search__input').focus();
  }
});

// доступное навигационное меню (enter и пробел)
$('.main-nav-sub').on('keydown', function (evt) {
  if (evt.keyCode === 13 || evt.keyCode === 32) {
    evt.preventDefault();
    let currentSublist = $(this).closest('.main-nav__item');

    $('.main-nav__item').not(currentSublist).removeClass('selected-on-tab');
    currentSublist.toggleClass('selected-on-tab');

    // клик мышкой вне выпадающего меню
    $(document).on('mouseup', function (evt) {
      if (!currentSublist.is(evt.target) && currentSublist.has(evt.target).length === 0) {
        currentSublist.removeClass('selected-on-tab');
      }
    });
  }
});

//
$('.search__input').on('keyup', function (evt) {
  let dataList = $('.search__datalist-wrap');
  dataList.addClass('active');

  $(document).on('mouseup', function (evt) {
    if (!dataList.is(evt.target) && dataList.has(evt.target).length === 0) {
      dataList.removeClass('active');
    }
  });
});
