'use strict';

(function () {

  var DEFAULT_COORDS_X = 570;
  var DEFAULT_COORDS_Y = 375;

  var adFormContainerElem = document.querySelector('.ad-form');
  var fieldsetElems = adFormContainerElem.querySelectorAll('fieldset');
  var addressElem = adFormContainerElem.querySelector('#address');
  var roomElem = adFormContainerElem.querySelector('#room_number');
  var capacityElem = adFormContainerElem.querySelector('#capacity');
  var housingTypeElem = adFormContainerElem.querySelector('#type');
  var housingPriceElem = adFormContainerElem.querySelector('#price');
  var timeInElem = adFormContainerElem.querySelector('#timein');
  var timeOutElem = adFormContainerElem.querySelector('#timeout');
  var resetButtonElem = adFormContainerElem.querySelector('.ad-form__reset');

  var mapFiltersElem = window.util.mapContainerElem.querySelector('.map__filters');
  var filterFormElems = window.util.mapContainerElem.querySelectorAll('.map__filter');
  var featuresElems = window.util.mapContainerElem.querySelectorAll('.map__features');
  var mainPinElem = window.util.mapContainerElem.querySelector('.map__pin--main');

  var successTemplateElem = document.querySelector('#success').content.querySelector('.success');

  var disableElems = function () {
    adFormContainerElem.classList.add('ad-form--disabled');
    window.util.mapContainerElem.classList.add('map--faded');
    window.util.addDisabled(fieldsetElems);
    window.util.addDisabled(filterFormElems);
    window.util.addDisabled(featuresElems);
  };

  var enableElems = function () {
    adFormContainerElem.classList.remove('ad-form--disabled');
    window.util.mapContainerElem.classList.remove('map--faded');
    window.util.removeDisabled(fieldsetElems);
    window.util.removeDisabled(filterFormElems);
    window.util.removeDisabled(featuresElems);
  };

  var setAddress = function (coordinates) {
    addressElem.value = coordinates.x + ', ' + coordinates.y;
  };

  var setPinDefaultCoords = function () {
    return {
      x: DEFAULT_COORDS_X + Math.round(window.util.PIN_SIZE / 2),
      y: DEFAULT_COORDS_Y + Math.round(window.util.PIN_SIZE / 2)
    };
  };

  var offerTypeToMinPrice = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000',
  };

  var setMinPriceValue = function (houseType) {
    housingPriceElem.min = offerTypeToMinPrice[houseType];
    housingPriceElem.placeholder = offerTypeToMinPrice[houseType];
  };

  var validateRoom = function () {
    capacityElem.setCustomValidity('');

    if (roomElem.value === '1') {
      if (capacityElem.value === '3' || capacityElem.value === '2' || capacityElem.value === '0') {
        capacityElem.setCustomValidity('для одной комнаты выберите вариант "для 1 гостя"');
      }
    } else if (roomElem.value === '2') {
      if (capacityElem.value === '3' || capacityElem.value === '0') {
        capacityElem.setCustomValidity('для 2х комнат выберите варианты "«для 2 гостей» или «для 1 гостя»');
      }
    } else if (roomElem.value === '3') {
      if (capacityElem.value === '0') {
        capacityElem.setCustomValidity('для 3х комнат выберите варианты «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      }
    } else if (roomElem.value === '100') {
      if (capacityElem.value === '3' || capacityElem.value === '2' || capacityElem.value === '1') {
        capacityElem.setCustomValidity('для 100 комнат выберите вариант "не для гостей"');
      }
    }
  };

  var onRoomElemChange = function () {
    validateRoom();
  };

  var onCapacityElemChange = function () {
    validateRoom();
  };

  var resetPage = function () {
    adFormContainerElem.reset();
    mapFiltersElem.reset();
    disableElems();
    mainPinElem.style.top = DEFAULT_COORDS_Y + 'px';
    mainPinElem.style.left = DEFAULT_COORDS_X + 'px';
    setAddress(setPinDefaultCoords());
    setMinPriceValue(housingTypeElem.value);
    validateRoom();
    window.render.removePins();
    window.render.removeCard();
  };

  var closeSuccess = function () {
    var successElem = document.querySelector('.success');
    if (successElem) {
      successElem.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSuccess();
    }
  };

  var onLoad = function () {
    var successNode = successTemplateElem.cloneNode(true);
    window.util.mainElem.appendChild(successNode);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closeSuccess);
    resetPage();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adFormContainerElem), onLoad, window.util.onError);
  };

  housingTypeElem.addEventListener('change', function () {
    setMinPriceValue(housingTypeElem.value);
  });

  timeInElem.addEventListener('change', function () {
    timeOutElem.value = timeInElem.value;
  });

  timeOutElem.addEventListener('change', function () {
    timeInElem.value = timeOutElem.value;
  });

  roomElem.addEventListener('change', onRoomElemChange);
  capacityElem.addEventListener('change', onCapacityElemChange);
  resetButtonElem.addEventListener('click', resetPage);
  adFormContainerElem.addEventListener('submit', onFormSubmit);

  disableElems();
  setAddress(setPinDefaultCoords());
  setMinPriceValue(housingTypeElem.value);
  validateRoom();

  window.form = {
    setAddress: setAddress,
    enableElems: enableElems,
    mainPinElem: mainPinElem,
    mapFiltersElem: mapFiltersElem
  };

})();
