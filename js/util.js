'use strict';

(function () {

  var addDisabled = function (array) {
    array.forEach(function (element) {
      element.disabled = true;
    });
  };

  var removeDisabled = function (array) {
    array.forEach(function (element) {
      element.disabled = false;
    });
  };

  window.util = {
    addDisabled: addDisabled,
    removeDisabled: removeDisabled,
    MAX_Y: 630,
    MIN_Y: 130,
    MIN_X: 0,
    maxX: document.querySelector('.map__pins').clientWidth,
    PIN_SIZE: 65,
    PIN_TAIL_SIZE: 18,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13
  };

})();
