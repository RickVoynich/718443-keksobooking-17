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

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
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
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    mapContainerElem: document.querySelector('.map')
  };

})();
