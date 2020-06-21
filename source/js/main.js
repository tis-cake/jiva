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

// блок предложений для поиска
$('.search__input').on('keyup', function (evt) {
  let dataList = $('.search__datalist-wrap');
  dataList.addClass('active');

  // скрыть если ничего нет
  if($(this).val().length === 0) {
    dataList.removeClass('active');
  }

  // скрыть если клик вне блока
  $(document).on('mouseup', function (evt) {
    if (!dataList.is(evt.target) && dataList.has(evt.target).length === 0) {
      dataList.removeClass('active');
    }
  });
});

// стилевое затемнение, если в фокусе с tab
$(document).ready(function () {
  // для телефона в шапке
  $('.aside-link__link').on({
    focus: () => {
      $('.aside-link').addClass('tab-focus');
    },
    blur: () => {
      $('.aside-link').removeClass('tab-focus');
    }
  });
  // для рехабов
  $('.rehab-swiper__link').on({
    focus: function() {
      $(this).closest('.rehab-swiper__item').addClass('tab-focus');
    },
    blur: function() {
      $(this).closest('.rehab-swiper__item').removeClass('tab-focus');
    }
  });
});

// сравнить центр
$('.btn-compare').on('click', function() {
  $(this).toggleClass('selected');
  $(this).prev().toggleClass('selected');
  $(this).blur();
})

// фильтр центров над картой
$(document).ready(function () {
  $('.contacts-map__filter-handler').on('click', function(){

    $(this).toggleClass('active');
    $data = $(this).data('id');
    $(this).find($('.contacts-map__filter-list[data-id='+$data+']').slideToggle());
    // $('.contacts-map__filter-options').toggleClass('active');

    $('.contacts-map__filter-item').click(function () {
      $value = $(this).text();
      $(this).addClass('active');

      $(this).closest('.contacts-map__filter-options').find('.contacts-map__filter-handler').text($value); // находим ближайшее поле ввода (ссылку)
                                                                                          //  и подставляем выбранное значение из списка

      $(this).closest('.contacts-map__filter-options').find('input').val($value);        // находим поле ввода и вставляем туда же текст
      if ($(this).closest('.contacts-map__filter-options').find('input').change()) {    // если поле было изменено - скрыть
        $(this).closest('.contacts-map__filter-options').find('.contacts-map__filter-handler').removeClass('active');
        $(this).closest('.contacts-map__filter-options').find('.contacts-map__filter-list').slideUp();
      }
    });
  });
});

