'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var selectedPin;
  window.pins = [];

    var onLoad = (function (data) {
    window.pins = data;
    for (var i = 0; i < window.pins.length; i++) {
      window.pins[i].id = i;
    }
    window.render.createPins(window.pins);
  });

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    card.classList.add('hidden');
    document.removeEventListener('keydown', onCardEscPress);
    selectedPin.classList.remove('map__pin--active');
  };

  var onCloseButtonClick = function (evt) {
    evt.preventDefault();
    closeCard();
  };

  var onCardEscPress = function (escPressEvt) {
    if (escPressEvt.keyCode === window.util.ESC_KEYCODE) {
      closeCard();
    }
  };

  var openCard = function (evt) {
    evt.preventDefault();
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');

    if (!pin) {
      return;
    }

    var id = pin.id.slice(4);
    var index = window.pins.findIndex(function (it) {
      return it.id === parseInt(id, 10);
    });

    window.render.removeCard();
    window.render.createCard(window.pins[index]);

    if (card) {
      var closeButton = document.querySelector('.popup__close');
      document.addEventListener('keydown', onCardEscPress);
      closeButton.addEventListener('click', onCloseButtonClick);
    }

    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    pin.classList.add('map__pin--active');
    selectedPin = pin;
  };

  var onMapPinsClick = function (evt) {
    evt.preventDefault();
    openCard(evt);
  };

  var onMapPinsEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openCard(evt);
    }
  };

  var setPinMainCoords = function (elem) {
    return {
      x: parseInt(elem.style.left, 10) + Math.round(window.util.PIN_SIZE / 2),
      y: parseInt(elem.style.top, 10) + window.util.PIN_SIZE + window.util.PIN_TAIL_SIZE
    };
  };

  var activatePage = function () {
    window.backend.load(onLoad, window.util.onError);
    window.form.unblockForm();
    mapPins.addEventListener('click', onMapPinsClick);
    mapPins.addEventListener('keydown', onMapPinsEnterPress);
  };

  var onMapPinMouseDown = function (evt) {
    evt.preventDefault();

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

      if (mapPin.offsetLeft > (window.util.maxX - Math.round(window.util.PIN_SIZE / 2))) {
        mapPin.style.left = (window.util.maxX - Math.round(window.util.PIN_SIZE / 2)) + 'px';
      }
      if (mapPin.offsetLeft < (window.util.MIN_X - Math.round(window.util.PIN_SIZE / 2))) {
        mapPin.style.left = (window.util.MIN_X - Math.round(window.util.PIN_SIZE / 2)) + 'px';
      }

      if (mapPin.offsetTop > window.util.MAX_Y) {
        mapPin.style.top = window.util.MAX_Y + 'px';
      }
      if (mapPin.offsetTop < window.util.MIN_Y) {
        mapPin.style.top = window.util.MIN_Y + 'px';
      }
      window.form.setAddress(setPinMainCoords(mapPin));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (map.classList.contains('map--faded')) {
        activatePage();
      }
      window.form.setAddress(setPinMainCoords(mapPin));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onPinMapEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      if (map.classList.contains('map--faded')) {
        activatePage();
      }
    }
  };

  mapPin.addEventListener('keydown', onPinMapEnterPress);
  mapPin.addEventListener('mousedown', onMapPinMouseDown);

})();
