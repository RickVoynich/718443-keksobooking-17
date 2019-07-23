'use strict';

(function () {

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');
  var mapFilter = map.querySelectorAll('.map__filter');
  var mapFeatures = map.querySelectorAll('.map__features');
  var allForms = [fieldsetAdForm, mapFilter, mapFeatures];
  var mapPin = document.querySelector('.map__pin--main');

  window.util.addDisabled(allForms);

  var address = adForm.querySelector('#address');
  var setAddress = function (coordinates) {
    address.value = coordinates.x + ', ' + coordinates.y;
  };

  var setPinDefaultCoords = function (element) {
    return {
      x: element.offsetLeft + Math.round(window.util.PIN_SIZE / 2),
      y: element.offsetTop + Math.round(window.util.PIN_SIZE / 2)
    };
  };

  setAddress(setPinDefaultCoords(mapPin));

  var setPinMainCoords = function (elem) {
    return {
      x: parseInt(elem.style.left, 10) + Math.round(window.util.PIN_SIZE / 2),
      y: parseInt(elem.style.top, 10) + window.util.PIN_SIZE + window.util.PIN_TAIL_SIZE
    };
  };

  var unblockForm = function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.pins.renderAllPins(window.pins.randomPins);
    window.util.removeDisabled(allForms);
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    unblockForm();

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
      setAddress(setPinMainCoords(mapPin));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setAddress(setPinMainCoords(mapPin));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
