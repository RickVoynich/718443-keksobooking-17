'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');

  var setPinDefaultCoords = function (element) {
    return {
      x: element.offsetLeft + Math.round(window.util.PIN_SIZE / 2),
      y: element.offsetTop + Math.round(window.util.PIN_SIZE / 2)
    };
  };

  window.form.setAddress(setPinDefaultCoords(mapPin));

  var setPinMainCoords = function (elem) {
    return {
      x: parseInt(elem.style.left, 10) + Math.round(window.util.PIN_SIZE / 2),
      y: parseInt(elem.style.top, 10) + window.util.PIN_SIZE + window.util.PIN_TAIL_SIZE
    };
  };

  // отрисовка пинов при активации
  var pins = [];
  var startLoadPins = function () {
    window.render.renderPins(pins);
    window.render.renderCards(pins);
  };

  // получение данных с сервера
  var successHandler = (function (data) {
    pins = data;
    for (var i = 0; i < pins.length; i++) {
      pins[i].id = i;
    }
    startLoadPins();
    window.pins = pins;
  });

  // Ошибка соединения с сервером
  var errorHandler = function () {
    var main = document.querySelector('main');
    var notice = document.querySelector('.notice');

    var errorMessage = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);

    main.insertBefore(errorMessage, notice);
  };

  // Отрисовка карточки по клику
  var pin;
  var loadCard = function (evt) {
    evt.preventDefault();
    var target = evt.target;

    if (target.nodeName === 'IMG') {
      target = target.parentNode;
    }

    var mainPin = target.classList.contains('map__pin--main');

    var id = target.id.slice(4);
    var index = pins.findIndex(function (it) {
      return it.id === parseInt(id, 10);
    });
    if (target.nodeName === 'BUTTON' && !mainPin) {
      window.render.removeCard();
      window.render.renderCards(pins[index]);
    }

    // Закрытие карточки
    var card = document.querySelector('.map__card');
    if (card) {
      var closeButton = card.querySelector('.popup__close');

      var closeCard = function () {
        card.classList.add('hidden');
        document.removeEventListener('keydown', onCardEscPress);
        pin.classList.remove('map__pin--active');
      };

      var onCardEscPress = function (e) {
        if (e.keyCode === window.util.ESC_KEYCODE) {
          closeCard();
        }
      };

      document.addEventListener('keydown', onCardEscPress);
      closeButton.addEventListener('click', closeCard);
    }


    // Смена класса при клике
    target.classList.add('map__pin--active');
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
    pin = target;
  };

  // Открытие карточки по Enter
  var openCard = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      loadCard();
    }
  };

  // Активация карты и загрузка пинов
  var pageActivation = function () {
    window.form.unblockForm();
    var mapPins = map.querySelector('.map__pins');
    mapPins.addEventListener('click', loadCard);
    mapPins.addEventListener('keydown', openCard);
    window.backend.load(successHandler, errorHandler);
  };

  // взаимодействия с главным пином
  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    pageActivation();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';

      if (mapPin.offsetLeft > (window.util.MAX_X - Math.round(window.util.PIN_SIZE / 2))) {
        mapPin.style.left = (window.util.MAX_X - Math.round(window.util.PIN_SIZE / 2)) + 'px';
      }
      if (mapPin.offsetLeft < (window.util.MIN_X - Math.round(window.util.PIN_SIZE / 2))) {
        mapPin.style.left = (window.util.MIN_X - Math.round(window.util.PIN_SIZE / 2)) + 'px';
      }

      if (mapPin.offsetTop > (window.util.MAX_Y - window.util.PIN_SIZE - window.util.PIN_TAIL_SIZE)) {
        mapPin.style.top = (window.util.MAX_Y - window.util.PIN_SIZE - window.util.PIN_TAIL_SIZE) + 'px';
      }
      if (mapPin.offsetTop < (window.util.MIN_Y - window.util.PIN_SIZE - window.util.PIN_TAIL_SIZE)) {
        mapPin.style.top = (window.util.MIN_Y - window.util.PIN_SIZE - window.util.PIN_TAIL_SIZE) + 'px';
      }
      window.form.setAddress(setPinMainCoords(mapPin));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setAddress(setPinMainCoords(mapPin));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
