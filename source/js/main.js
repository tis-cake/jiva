const body = document.querySelector('body');
const header = document.querySelector('header');
const width = document.body.clientWidth;
const height = document.body.clientHeigh;
const anchors = document.querySelectorAll('a[href*="#"]'); // якоря
const inputsTel = document.querySelectorAll('input[type="tel"]'); // поля с вводом телефона
const overlay = document.querySelector('.overlay');
const modals = document.querySelectorAll('.modal');

// мобильное меню
let menuToggle = header.querySelector(".menu-toggle");
menuToggle.addEventListener('click', function(evt) {
  body.classList.toggle('noscroll');
  this.classList.toggle('active');
  header.classList.toggle('active');
});

// навигационное подменю на мобильном
if (width <= 756) {
  let navSubListLinks = header.querySelectorAll('.main-nav-sub');     // ссылки со списками
  let navSubListAll = header.querySelectorAll('.main-nav__sublist');  // списки

  for (let navSubListLink of navSubListLinks) {
    navSubListLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      let currentSubList = navSubListLink.nextElementSibling;

      this.classList.toggle('active');
      currentSubList.classList.toggle('active');

    });
  }
}

// галерея фото
lightGallery(document.querySelector('#lightgallery'));

// маска на телефон
Inputmask({"mask": "+7 ( 999 ) 999 99 - 99"}).mask(inputsTel);

// вкладка "подробнее" у списка
let moreBtnArr = document.querySelectorAll('.list__more-info');
for (let moreBtn of moreBtnArr) {
  let currentMoreBlock = moreBtn.closest('.list__more-wrap').querySelector('.list__more-block');
  let currentModalClose = currentMoreBlock.querySelector('.list__more-close');
  let mainMoreBlock = body.querySelector('.list__main-wrap');

  // если элемент в фокусе с клавиатуры - показать вкладку
  if (width > 756) {
    moreBtn.onfocus = () => {
      currentMoreBlock.classList.add('focus');
      mainMoreBlock.classList.add('tab');
    };

    moreBtn.onblur = () => {
      currentMoreBlock.classList.remove('focus');
      mainMoreBlock.classList.remove('tab');
    };
  }

  // отдельное модальное окно
  if (width <= 756) {
    moreBtn.addEventListener('click', function(evt) {

      // let currentMoreBlock = moreBtn.nextElementSibling;
      // let currentMoreBlock = moreBtn.closest('.list__more-wrap').querySelector('.list__more-block');
      // let currentModalClose = currentMoreBlock.querySelector('.list__more-close');

      // openModal(currentMoreBlock);
      currentMoreBlock.classList.add('active');
      overlay.classList.add('active');

      currentModalClose.onclick = () => {
        closeModal(currentMoreBlock);
      };

      overlay.ontouchstart = () => {
        closeModal(currentMoreBlock);
      };
    })
  }
}

// оставить телефон (модальное окно 1)
let modalCallback = body.querySelector('.modal--callback');
let modalCallbackArr = body.querySelectorAll('.modal-callback');
for (let i = 0; i < modalCallbackArr.length; i++) {
  let currentModal = modalCallbackArr[i];
  currentModal.addEventListener('click', function(evt) {
    evt.preventDefault();
    openModal(modalCallback, '.modal__input-phone');
  })
}

// заявка на экскурсию (модальное окно 2)
let modalExcursion = body.querySelector('.modal--excursion');
let modalExcursionArr = body.querySelectorAll('.modal-excursion');
for (let i = 0; i < modalExcursionArr.length; i++) {
  let currentModal = modalExcursionArr[i];
  currentModal.addEventListener('click', function(evt) {
    evt.preventDefault();
    openModal(modalExcursion, '.modal__input-phone');
  })
}

// кнопка close
let modalClose = body.querySelector('.modal__close');
modalClose.addEventListener('click', function() {
  closeModal();
})

// нажат esc -> закрыть окно
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    closeModal();
  }
});

// клик по оверлею (имитация клика вне модального окна)
overlay.addEventListener('click', function() {
  closeModal();
});

// тач по оверлею (имитация клика вне модального окна)
overlay.addEventListener('touchstart', function() {
  closeModal();
});

function openModal(element, focus) {
  element.classList.add('active');
  overlay.classList.add('active');
  body.classList.add('noscroll');

  if (focus) {
    element.querySelector(focus).focus();
  }
}

function closeModal(element) {
  if (element && element.classList.contains('active')) {
    element.classList.remove('active');
  } else {
    for (let i = 0; i < modals.length; i++) {
      let modal = modals[i];
      if (modal.classList.contains('active')) {
        modal.classList.remove('active');
      }
    }
  }

  overlay.classList.remove('active');
  body.classList.remove('noscroll');
}

// показ фонового видео для устройств, находящихся в режиме энергосбережения
// отслеживаем - воспроизводится ли видео или нет
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
  get: function () {
    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
  }
});
// если устройство в режиме э/с -> сработает событие suspend

let videoElement = body.querySelector('#main-video');
if (videoElement) {
  body.addEventListener('touchstart', function() {
    startVideo();
  })
}

function startVideo() {
  if (videoElement.playing) {
    // видео уже запущено, ничего не делаем
    console.log('играем');
  }
  else {
    // видео не запущено, запустить!
    videoElement.play();
    console.log('не играем');
  }
}
