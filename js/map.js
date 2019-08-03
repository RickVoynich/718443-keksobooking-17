'use strict';

(function () {

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
  };

  // получение данных с сервера
  var successHandler = (function (data) {
    pins = data;
    startLoadPins();
    window.pins = pins;
  });

  // Ошибка соединения с сервером
  var errorHandler = function (errorMessage) {
    var main = document.querySelector('main');
    var notice = document.querySelector('.notice');

    var errorMessage = document.querySelector('#error')
      .content
      .querySelector('.error')
      .cloneNode(true);

    main.insertBefore(errorMessage, notice);
  };

  // Активация карты и загрузка пинов
   var pageActivation = function () {
    window.form.unblockForm();

    window.backend.load(successHandler, errorHandler);
  };

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
