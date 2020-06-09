// кастомный language-select
$('.custom-select-js').customSelect();
$('.custom-select').length != 0 ? $('.select-lang').addClass('custom') : $('.select-lang').removeClass('custom');

$('.search-toggle').click(function() {
  $(this).toggleClass('active');
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
