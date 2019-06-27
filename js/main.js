'use strict';

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
  }
}

var getAvatar = function (i) {
  return 'img/avatars/user0' + (i + 1) + '.png';
}
var getType = function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  return types[getRandomInt(0, types.length)];
}

var getX = function (minX, maxX) {
  return getRandomInt(minX, maxX);
}

var getY = function (minY, maxY) {
  return getRandomInt(minY, maxY);
}

var pins = [];
for (var i = 0; i < PIN_QUANTITY; i++) {
  pins.push(fillPin(getAvatar(i), getType(), getX(MIN_X, MAX_X - PIN_SIZE / 2), getY(MIN_Y, MAX_Y - PIN_SIZE)));
}

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

// Создает DOM-элементы, заполняет их данными из массива.
var pinListElement = mapBlock.querySelector('.map__pins');
var pinPointTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pins) {
  var pinElement = pinPointTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pins.author.avatar;
  pinElement.querySelector('img').alt = pins.offer.type;
  pinElement.style = 'left: ' + pins.location.x + 'px;' + 'top: ' + pins.location.y + 'px';
  return pinElement;
};

// 4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.


// Требования к коду
// Код должен быть разделён на отдельные функции.
// Стоит отдельно объявить функцию генерации случайных данных,
// функцию создания DOM-элемента на основе JS-объекта,
// функцию заполнения блока DOM-элементами на основе массива JS-объектов.
// Пункты задания примерно соответствуют функциям, которые вы должны создать.
