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
var PIN_TAIL_SIZE = 18;

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
var address = adForm.querySelector('#address');

var setAddress = function (coordinates) {
  address.value = coordinates.x + ', ' + coordinates.y;
};

var setPinDefaultCoords = function (element) {
  return {
    x: element.offsetLeft + Math.round(PIN_SIZE / 2),
    y: element.offsetTop + Math.round(PIN_SIZE / 2)
  };
};

setAddress(setPinDefaultCoords(mapPin));

var setPinMainCoords = function (elem) {
  return {
    x: parseInt(elem.style.left, 10) + Math.round(PIN_SIZE / 2),
    y: parseInt(elem.style.top, 10) + PIN_SIZE + PIN_TAIL_SIZE
  };
};

var unblockForm = function () {
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  renderAllPins(pins);
  removeDisabled(fieldsetAdForm);
  removeDisabled(mapFilter);
  removeDisabled(mapFeatures);
};

mapPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  unblockForm();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
    mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';

    if (mapPin.offsetLeft > (MAX_X - Math.round(PIN_SIZE / 2))) {
      mapPin.style.left = (MAX_X - Math.round(PIN_SIZE / 2)) + 'px';
    }
    if (mapPin.offsetLeft < (MIN_X - Math.round(PIN_SIZE / 2))) {
      mapPin.style.left = (MIN_X - Math.round(PIN_SIZE / 2)) + 'px';
    }

    if (mapPin.offsetTop > (MAX_Y - PIN_SIZE - PIN_TAIL_SIZE)) {
      mapPin.style.top = (MAX_Y - PIN_SIZE - PIN_TAIL_SIZE) + 'px';
    }
    if (mapPin.offsetTop < (MIN_Y - PIN_SIZE - PIN_TAIL_SIZE)) {
      mapPin.style.top = (MIN_Y - PIN_SIZE - PIN_TAIL_SIZE) + 'px';
    }
    setAddress(setPinMainCoords(mapPin));
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setAddress(setPinMainCoords(mapPin));
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

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

setMinPriceValue(houseTypes.value);

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
