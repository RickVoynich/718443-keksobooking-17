'use strict';

(function () {
  var map = document.querySelector('.map');
  var PIN_QUANTITY = 8;

  var fillPin = function (avatar, type, x, y) {
    return {
      'author': {
        'avatar': avatar
      },
      'offer': {
        'type': type
      },
      'location': {
        'x': x,
        'y': y
      }
    };
  };

  var getAvatar = function (i) {
    return 'img/avatars/user0' + (i + 1) + '.png';
  };

  var getType = function () {
    var types = ['palace', 'flat', 'house', 'bungalo'];
    return types[window.util.getRandomInt(0, types.length)];
  };

  var getX = function (minX, maxX) {
    return window.util.getRandomInt(minX, maxX);
  };

  var getY = function (minY, maxY) {
    return window.util.getRandomInt(minY, maxY);
  };

  var pins = [];
  for (var i = 0; i < PIN_QUANTITY; i++) {
    pins.push(fillPin(getAvatar(i), getType(), getX(window.util.MIN_X, window.util.MAX_X - window.util.PIN_SIZE / 2), getY(window.util.MIN_Y, window.util.MAX_Y - window.util.PIN_SIZE)));
  }

  var pinListElement = map.querySelector('.map__pins');
  var pinPointTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinPointTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;
    pinElement.style = 'left: ' + pin.location.x + 'px;' + 'top: ' + pin.location.y + 'px';
    return pinElement;
  };

  var fragment = document.createDocumentFragment();

  var renderAllPins = function (array) {
    for (var j = 0; j < array.length; j++) {
      fragment.appendChild(renderPin(array[j]));
    }
    pinListElement.appendChild(fragment);
  };

  window.pins = {
    renderAllPins: renderAllPins,
    randomPins: pins
  };

})();
