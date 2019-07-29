'use strict';

(function () {

  var map = document.querySelector('.map');
  var PIN_QUANTITY = 5;

  var pinListElement = map.querySelector('.map__pins');
  var pinPointTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinPointTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;
    pinElement.style = 'left: ' + pin.location.x + 'px;' + 'top: ' + pin.location.y + 'px';
    return pinElement;
  };

  var renderAllPins = function (array) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < PIN_QUANTITY; j++) {
      fragment.appendChild(renderPin(array[j]));
    }
    pinListElement.appendChild(fragment);
  };

  window.pins = {
    renderAllPins: renderAllPins,
  };

})();
