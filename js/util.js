'use strict';

(function () {

  var errorTemplateElem = document.querySelector('#error').content.querySelector('.error');
  var errorNode = errorTemplateElem.cloneNode(true);

  var addDisabled = function (elements) {
    elements.forEach(function (element) {
      element.disabled = true;
    });
  };

  var removeDisabled = function (elements) {
    elements.forEach(function (element) {
      element.disabled = false;
    });
  };

  var closeError = function () {
    var errorElem = document.querySelector('.error');
    if (errorElem) {
      errorElem.remove();
      document.removeEventListener('keydown', onErrorEscPress);
      errorNode.removeEventListener('click', onErrorClick);
    }
  };

  var onErrorClick = function (evt) {
    evt.preventDefault();
    closeError();
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeError();
    }
  };

  var onError = function () {
    window.util.mainElem.appendChild(errorNode);
    var errorButtonElem = document.querySelector('.error__button');
    errorButtonElem.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscPress);
    errorNode.addEventListener('click', onErrorClick);
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
