'use strict';

(function () {

  var mapPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  var setPinMainCoords = function (elem) {
    return {
      x: parseInt(elem.style.left, 10) + Math.round(window.util.PIN_SIZE / 2),
      y: parseInt(elem.style.top, 10) + window.util.PIN_SIZE + window.util.PIN_TAIL_SIZE
    };
  };

  window.pins = [];

  var successHandler = (function (data) {
    window.pins = data;
    for (var i = 0; i < window.pins.length; i++) {
      window.pins[i].id = i;
    }
    window.render.renderPins(window.pins);
  });

  var selectedPin;
  var loadCard = function (evt) {
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
    window.render.renderCards(window.pins[index]);


    var card = document.querySelector('.map__card');
    if (card) {
      var closeButton = card.querySelector('.popup__close');

      var closeCard = function () {
        card.classList.add('hidden');
        document.removeEventListener('keydown', onCardEscPress);
        selectedPin.classList.remove('map__pin--active');
      };

      var onCardEscPress = function (escPressEvt) {
        if (escPressEvt.keyCode === window.util.ESC_KEYCODE) {
          closeCard();
        }
      };

      document.addEventListener('keydown', onCardEscPress);
      closeButton.addEventListener('click', closeCard);
    }

    if (selectedPin) {
      selectedPin.classList.remove('map__pin--active');
    }
    pin.classList.add('map__pin--active');
    selectedPin = pin;
  };

  var openCard = function (enterPressEvt) {
    if (enterPressEvt.keyCode === window.util.ENTER_KEYCODE) {
      loadCard();
    }
  };

  var activatePage = function () {
    window.form.unblockForm();
    mapPins.addEventListener('click', loadCard);
    mapPins.addEventListener('keydown', openCard);
    window.backend.load(successHandler);
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      activatePage();
    }

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
      window.form.setAddress(setPinMainCoords(mapPin));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
