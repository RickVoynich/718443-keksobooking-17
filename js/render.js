'use strict';

(function () {
  var map = document.querySelector('.map');
  var PIN_QUANTITY = 5;
  var pinListElement = document.querySelector('.map__pins');
  var pinPointTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = [];

  // рендер пинов
  var renderPin = function (pin) {
    var pinElement = pinPointTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;
    pinElement.style = 'left: ' + pin.location.x + 'px;' + 'top: ' + pin.location.y + 'px';
    return pinElement;
  };

  // отрисовать пины
  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < PIN_QUANTITY; j++) {
      fragment.appendChild(renderPin(array[j]));
    }
    pinListElement.appendChild(fragment);
  };

  // удалить пины
  var removePins = function () {
    var allPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (currentPin) {
      currentPin.parentNode.removeChild(currentPin);
    });
  };

  window.render = {
    renderPins: renderPins,
    removePins: removePins
  };

})();
