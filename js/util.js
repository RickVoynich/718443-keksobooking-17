'use strict';

(function () {

  var errorTemplateElem = document.querySelector('#error').content.querySelector('.error');

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
    var errorNode = errorTemplateElem.cloneNode(true);
    window.util.mainElem.appendChild(errorNode);

    var errorButtonElem = document.querySelector('.error__button');
    errorButtonElem.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', closeError);
  };

  var closeError = function () {
    var errorElem = document.querySelector('.error');
    if (errorElem) {
      errorElem.remove();
      document.removeEventListener('keydown', onErrorEscPress);
      document.removeEventListener('click', closeError);
    }
  };

  var onErrorEscPress = function () {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeError();
    }
  };

  window.util = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,
    PIN_SIZE: 65,
    PIN_TAIL_SIZE: 18,
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    maxX: document.querySelector('.map__pins').clientWidth,
    mapContainerElem: document.querySelector('.map'),
    mainElem: document.querySelector('main'),
    addDisabled: addDisabled,
    removeDisabled: removeDisabled,
    onError: onError
  };

})();
