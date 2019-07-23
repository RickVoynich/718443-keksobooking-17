'use strict';

(function () {

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var addDisabled = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].disabled = true;
    }
  };

  var removeDisabled = function (element) {
    for (var j = 0; j < element.length; j++) {
      element[j].disabled = false;
    }
  };

  window.util = {
    getRandomInt: getRandomInt,
    addDisabled: addDisabled,
    removeDisabled: removeDisabled,
    MAX_Y: 630,
    MIN_Y: 130,
    MIN_X: 0,
    MAX_X: document.querySelector('.map__pins').clientWidth,
    PIN_SIZE: 65,
    PIN_TAIL_SIZE: 18
  };

})();
