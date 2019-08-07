'use strict';

(function () {

  var mapPinsElem = window.util.mapContainerElem.querySelector('.map__pins');
  var selectedPin;
  window.pins = [];

  var onDataLoad = (function (data) {
    window.pins = data;
    window.pins = data.map(function (pin, i) {
      pin.id = i;
      return pin;
    });
    window.render.createPins(window.pins);
  });

  var closeCard = function () {
    document.removeEventListener('keydown', onCardEscPress);
    selectedPin.classList.remove('map__pin--active');
    var card = document.querySelector('.map__card');
    if (card) {
      card.classList.add('hidden');
    }
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

    var card = document.querySelector('.map__card');
    if (card) {
      var closeButtonElem = document.querySelector('.popup__close');
      document.addEventListener('keydown', onCardEscPress);
      closeButtonElem.addEventListener('click', onCloseButtonClick);
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
    window.form.enableElems();
    mapPinsElem.addEventListener('click', onMapPinsClick);
    mapPinsElem.addEventListener('keydown', onMapPinsEnterPress);
    window.backend.load(onDataLoad, window.util.onError);
  };

  var onMainPinElemMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (window.util.mapContainerElem.classList.contains('map--faded')) {
        activatePage();
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.form.mainPinElem.style.top = (window.form.mainPinElem.offsetTop - shift.y) + 'px';
      window.form.mainPinElem.style.left = (window.form.mainPinElem.offsetLeft - shift.x) + 'px';

      if (window.form.mainPinElem.offsetLeft > (window.util.maxX - Math.round(window.util.PIN_SIZE / 2))) {
        window.form.mainPinElem.style.left = (window.util.maxX - Math.round(window.util.PIN_SIZE / 2)) + 'px';
      }
      if (window.form.mainPinElem.offsetLeft < (window.util.MIN_X - Math.round(window.util.PIN_SIZE / 2))) {
        window.form.mainPinElem.style.left = (window.util.MIN_X - Math.round(window.util.PIN_SIZE / 2)) + 'px';
      }

      if (window.form.mainPinElem.offsetTop > window.util.MAX_Y) {
        window.form.mainPinElem.style.top = window.util.MAX_Y + 'px';
      }
      if (window.form.mainPinElem.offsetTop < window.util.MIN_Y) {
        window.form.mainPinElem.style.top = window.util.MIN_Y + 'px';
      }
      window.form.setAddress(setPinMainCoords(window.form.mainPinElem));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (window.util.mapContainerElem.classList.contains('map--faded')) {
        activatePage();
      }
      window.form.setAddress(setPinMainCoords(window.form.mainPinElem));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMainPinElemEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      if (window.util.mapContainerElem.classList.contains('map--faded')) {
        activatePage();
      }
    }
  };

  window.form.mainPinElem.addEventListener('keydown', onMainPinElemEnterPress);
  window.form.mainPinElem.addEventListener('mousedown', onMainPinElemMouseDown);

})();
