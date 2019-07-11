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

var map = document.querySelector('.map');
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

var adForm = document.querySelector('.ad-form');
var fieldsetAdForm = adForm.querySelectorAll('fieldset');
var mapFilter = map.querySelectorAll('.map__filter');
var mapFeatures = map.querySelectorAll('.map__features');

var addDisabled = function (element) {
  for (i = 0; i < element.length; i++) {
    element[i].disabled = true;
  }
};

var removeDisabled = function (element) {
  for (i = 0; i < element.length; i++) {
    element[i].disabled = false;
  }
};

addDisabled(fieldsetAdForm);
addDisabled(mapFilter);
addDisabled(mapFeatures);

var mapPin = document.querySelector('.map__pin--main');

var onMapPinClick = function () {
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  renderAllPins(pins);
  removeDisabled(fieldsetAdForm);
  removeDisabled(mapFilter);
  removeDisabled(mapFeatures);
};

mapPin.addEventListener('click', onMapPinClick);

var address = adForm.querySelector('#address');

var getPinMainCoords = function () {
  return {
    x: parseInt(mapPin.style.left, 10),
    y: parseInt(mapPin.style.top, 10)
  };
};

var setAddress = function (coordinates) {
  address.value = coordinates.x + ', ' + coordinates.y;
};

setAddress(getPinMainCoords()); // Дефолтные координаты пина при загрузке страницы

var onMapPinMouseUp = function () {
  setAddress(getPinMainCoords());
};

mapPin.addEventListener('mouseup', onMapPinMouseUp);

var houseTypes = document.querySelector('#type');
var housePriceInput = document.querySelector('#price');

var MIN_PRICES = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

var setMinPriceValue = function (houseType) {
  var minPrice = MIN_PRICES[houseType];
  housePriceInput.min = minPrice;
  housePriceInput.placeholder = minPrice;
};

houseTypes.addEventListener('change', function () {
  setMinPriceValue(houseTypes.value);
});

var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');

timeInSelect.addEventListener('change', function () {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', function () {
  timeInSelect.value = timeOutSelect.value;
});
