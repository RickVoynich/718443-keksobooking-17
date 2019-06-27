'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var PIN_QUANTITY = 8;
var MAX_Y = 630;
var MIN_Y = 130;
var MIN_X = 0;
var MAX_X = document.querySelector('.map__pins').clientWidth;
var PIN_SIZE = 65;

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
  return types[getRandomInt(0, types.length)];
};

var getX = function (minX, maxX) {
  return getRandomInt(minX, maxX);
};

var getY = function (minY, maxY) {
  return getRandomInt(minY, maxY);
};

var pins = [];
for (var i = 0; i < PIN_QUANTITY; i++) {
  pins.push(fillPin(getAvatar(i), getType(), getX(MIN_X, MAX_X - PIN_SIZE / 2), getY(MIN_Y, MAX_Y - PIN_SIZE)));
}

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var pinListElement = mapBlock.querySelector('.map__pins');
var pinPointTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pinArray) {
  var pinElement = pinPointTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pinArray.author.avatar;
  pinElement.querySelector('img').alt = pinArray.offer.type;
  pinElement.style = 'left: ' + pinArray.location.x + 'px;' + 'top: ' + pinArray.location.y + 'px';
  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < pins.length; j++) {
  fragment.appendChild(renderPin(pins[j]));
}
pinListElement.appendChild(fragment);
