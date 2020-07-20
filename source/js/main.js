$('.select-lang input[name=LANG]').change(function () {
  console.log('Язык изменён');
  // location.reload();
});

// выбор языка
$(document).ready(function () {

  let selectLang = $('.select-lang__select'),
      optionLang = $('.select-lang__option'),
      inputLang = $('.select-lang__input'),
      listLang = $('.select-lang__list');

  // выпадающее меню
  selectLang.on('click', function (evt) {
    evt.preventDefault();

    if (selectLang.hasClass('active')) {
      selectLang.removeClass('active');
      listLang.slideUp();
    } else {
      listLang.slideDown();
      $(this).toggleClass('active');
    }

    // клик вне элемента
    $(document).on('mouseup touchstart', function (evt) {
      let currentEl = $(".select-lang__select.active");
      if (!currentEl.is(evt.target) && currentEl.has(evt.target).length === 0) {
        selectLang.removeClass('active');
        listLang.slideUp();
      }
    });
  });

  // выбор языка
  optionLang.on('click', function (evt) {
    evt.preventDefault();

    let val = $(this).text();
    selectLang.text(val);

    val = $(this).data('lang');
    inputLang.val(val);
    inputLang.change();

    selectLang.removeClass('active');
    listLang.slideUp();

    console.log(inputLang.val());
  });

});

// $('body').on('click', '.select-lang option', function (e) {
//   let val = $(this).val()
//   let input = $(this).closest('.select-lang').find('input');
//   input.val(val);
//   input.change();
//   console.log(input.val());
// });

// кастомный language-select
// $('.custom-select-js').customSelect();
// $('.custom-select').length != 0 ? $('.select-lang').addClass('custom') : $('.select-lang').removeClass('custom');

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

// сравнить центр (включая localStorage)
$(document).ready(function () {

  let itemsArray;

  // если в хранилище есть ключ items - конвертируем содержимое хранилища
  //   в массив itemsArray, иначе - оставляем массив пустым
  if (localStorage.getItem('items')) {
    itemsArray = JSON.parse(localStorage.getItem('items'))
  } else {
    itemsArray = []
  }

  // записываем в хранилище массив itemsArray в виде строки
  localStorage.setItem('items', JSON.stringify(itemsArray));

  // // конвертируем содержимое хранилища в новый массив для перебора
  // const data = JSON.parse(localStorage.getItem('items'));
  for (let itemsEl of itemsArray) {
    let currentSlide = $('.rehab-swiper__link[data-rehab-id="'+itemsEl+'"]');
    currentSlide.addClass('selected');
    currentSlide.closest('.rehab-swiper__item').find('.rehab-swiper__btn-compare').addClass('selected');
  }

  showComparePageLink();

  // сравнить центр
  $('.btn-compare-toggle-js').on('click', function() {

    let currentSlide = $(this).closest('.rehab-swiper__item').find('.rehab-swiper__link');
    let currentDataID = currentSlide.data('rehab-id');

    $(this).toggleClass('selected');
    currentSlide.toggleClass('selected');
    $(this).blur();

    // добавляем/удаляем текущий элемент в массив,
    //   перезаписываем хранилище обновленным массивом
    if (currentSlide.hasClass('selected')) {
      itemsArray.push(currentDataID);
      localStorage.setItem('items', JSON.stringify(itemsArray));
    } else {
      let indexEl = itemsArray.indexOf(currentDataID);
      itemsArray.splice(indexEl, 1);
      localStorage.setItem('items', JSON.stringify(itemsArray));
    }

    showComparePageLink();
  })

  // удаляем центр (на странице сравнения)
  $('.btn-compare-remove-js').on('click', function() {
    let currentSlide = $(this).closest('.rehab-swiper__item').find('.rehab-swiper__link');
    let currentDataID = currentSlide.data('rehab-id');

    $(this).removeClass('selected');
    currentSlide.removeClass('selected');
    $(this).blur();

    // удаляем из хранилища
    let indexEl = itemsArray.indexOf(currentDataID);
    itemsArray.splice(indexEl, 1);
    localStorage.setItem('items', JSON.stringify(itemsArray));

    console.log('Центр удалён');
  });

  // показываем ссылку на страницу стравнения
  function showComparePageLink() {
    if ($('.rehab-swiper__link').hasClass('selected')) {
      $('.rehab-compare-link').addClass('active');
    } else {
      $('.rehab-compare-link').removeClass('active');
    }
  }
});

// фильтр центров над картой
$(document).ready(function () {
  $('.filter__handler').on('click', function() {

    $data = $(this).data('id');

    // закрываем все списки, кроме текущего
    $('.filter__handler').not($(this)).removeClass('active');
    $('.filter__options').not($(this).closest('.filter__options')).removeClass('active');
    $('.filter__list').not($('.filter__list[data-id='+$data+']')).slideUp();

    // открываем текущий список
    $(this).toggleClass('active');
    $(this).closest('.filter__options').toggleClass('active');
    $(this).find($('.filter__list[data-id='+$data+']').slideToggle());

    // закрываем все списки при клике вне элемента
    $(document).on('mouseup touchstart', function (evt) {
      let currentEl = $(".filter__options.active");
      if (!currentEl.is(evt.target) && currentEl.has(evt.target).length === 0) {
        $('.filter__handler').removeClass('active');
        $('.filter__options').removeClass('active');
        $('.filter__list').slideUp();
      }
    });

    // ловим клик внутри списка и подставляем выбранное значение
    $('.filter__item').click(function () {
      $value = $(this).text();
      $(this).addClass('active');

      $(this).closest('.filter__options').find('.filter__handler').text($value);

      $(this).closest('.filter__options').find('input').val($value);
      if ($(this).closest('.filter__options').find('input').change()) {
        $(this).closest('.filter__options').removeClass('active');
        $(this).closest('.filter__options').find('.filter__handler').removeClass('active');
        $(this).closest('.filter__options').find('.filter__list').slideUp();
      }
    });
  });
});


// табы с разделами базы знаний
$(document).ready(function () {
  $('.topics-switch__link:not(.modal-sections)').on('click', function(evt) {

    let tabID = $(this).data('topic');
    if (tabID) {
      evt.preventDefault();
    }

    let tab = $('.topics-switch__sublist[data-topic='+tabID+']');

    $('.topics-switch__link').removeClass('active');
    $(this).addClass('active');

    $('.topics-switch__sublist').not(tab).removeClass('active');
    $(tab).addClass('active');

    // let tab = $(this).attr('href');
    // $('.topics-switch__sublist').not(tab).removeClass('active');
    // $(tab).addClass('active');
  })
});

// комментарии под статьёй
$(document).ready(function () {
  $('.comments__reply-btn').on('click', function() {
    $(this).addClass('hidden');
    let currentBlock = $(this).closest('.comments__block');

    currentBlock.find('.comments__reply-form').addClass('active');
  })
});

// табы
$(document).ready(function() {

  // показываем модалку с табами
  $(".modal-sections").click(function(evt) {
    evt.preventDefault();
    $(".modal-sections-tab").addClass('active');
    $("body").addClass('noscroll');
  });

  // закрываем
  $(".modal-sections-tab__close").click(function() {
    $(".modal-sections-tab").removeClass('active');
    $("body").removeClass('noscroll');
  });

  let currentHeight;
  let heightOverflow = 600;

  // клик по табам, но не по кнопке "all"
  $(".modal-sections-tab__toggle-btn").click(function() {
    let selectedTab = $(this).closest('.modal-sections-tab__item').find('.modal-sections-tab__sub-list');

    $(".modal-sections-tab__toggle-btn").not(this).removeClass('active');
    $(".modal-sections-tab__sub-list").not(selectedTab).removeClass('active');

    $(this).toggleClass("active");
    $(selectedTab).toggleClass("active");

    // при переполнении в правом блоке добавляем скролл
    // currentHeight = $('.modal-sections-tab__right').height();

    if (width > 756) {
      currentHeight = $(selectedTab).height();
      resizeRightColumn(currentHeight);
    }
  });

  function resizeRightColumn(height) {
    if (height > heightOverflow) {
      $('.modal-sections-tab__sub-list').addClass('overflow');
    } else {
      $('.modal-sections-tab__sub-list').removeClass('overflow');

    }
  }
});
