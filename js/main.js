'use strict';


// Функция генерации случайных чисел
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


// 1. Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку. Структура объектов должна быть следующей:

// {
//   "author": {
//     "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//   },

//   "location": {
//     "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//     "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }
var PIN_QUANTITY = 8;
var MAX_Y = 630;
var MIN_Y = 130;
var MIN_X = 0;
var MAX_X = 500; //временное значение
var PIN_WIDTH = 50; //временное значение
var PIN_HEIGHT = 50; //временное значение

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
  pins.push(fillPin(getAvatar(i), getType(), getX(MIN_X, MAX_X - PIN_WIDTH / 2), getY(MIN_Y, MAX_Y - PIN_HEIGHT)));
}





// Перевод карты в активное состояние
var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');


// 3. На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
// Итоговую разметку метки .map__pin можно взять из шаблона #pin.

// У метки должны быть следующие данные:
// Координаты: style="left: {{location.x}}px; top: {{location.y}}px;"
// src="{{author.avatar}}"
// alt="{{заголовок объявления}}"
// Обратите внимание. Координаты X и Y, которые вы вставите в разметку, это не координаты левого верхнего угла блока метки,
// а координаты, на которые указывает метка своим острым концом.
// Чтобы найти эту координату нужно учесть размеры элемента с меткой.

// 4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.


// Требования к коду
// Код должен быть разделён на отдельные функции.
// Стоит отдельно объявить функцию генерации случайных данных,
// функцию создания DOM-элемента на основе JS-объекта,
// функцию заполнения блока DOM-элементами на основе массива JS-объектов.
// Пункты задания примерно соответствуют функциям, которые вы должны создать.
