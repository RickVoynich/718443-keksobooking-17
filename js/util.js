'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  var onError = function () {
    var errorNode = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    document.querySelector('main').appendChild(errorNode);

    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', closeError);
  };

  var closeError = function () {
    var error = document.querySelector('.error');
    if (error) {
      error.remove();
      document.removeEventListener('keydown', onErrorEscPress);
      document.removeEventListener('click', closeError);
    }
  };

  var onErrorEscPress = function () {
    if (window.util.isEscPressed) {
      closeError();
    }
  };

  window.util = {
    addDisabled: addDisabled,
    removeDisabled: removeDisabled,
    onError: onError,
    MAX_Y: 630,
    MIN_Y: 130,
    MIN_X: 0,
    maxX: document.querySelector('.map__pins').clientWidth,
    PIN_SIZE: 65,
    PIN_TAIL_SIZE: 18,
    isKeyBoardEvent: function (evt) {
      return evt instanceof KeyboardEvent;
    },
    isEnterPressed: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    mapContainerElem: document.querySelector('.map')
  };

})();
