'use strict';

(function () {

  var DEFAULT_COORDS_X = 570;
  var DEFAULT_COORDS_Y = 375;
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var roomSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var mapFilters = window.util.mapContainerElem.querySelector('.map__filters');
  var mapFilterForm = window.util.mapContainerElem.querySelectorAll('.map__filter');
  var mapFeatures = window.util.mapContainerElem.querySelectorAll('.map__features');
  var mapPin = document.querySelector('.map__pin--main');
  var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var housingTypes = document.querySelector('#type');
  var housePriceInput = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var disableElems = function () {
    adForm.classList.add('ad-form--disabled');
    window.util.mapContainerElem.classList.add('map--faded');
    window.util.addDisabled(fieldsetAdForm);
    window.util.addDisabled(mapFilterForm);
    window.util.addDisabled(mapFeatures);
  };

  var enableElems = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.mapContainerElem.classList.remove('map--faded');
    window.util.removeDisabled(fieldsetAdForm);
    window.util.removeDisabled(mapFilterForm);
    window.util.removeDisabled(mapFeatures);
  };

  var setAddress = function (coordinates) {
    address.value = coordinates.x + ', ' + coordinates.y;
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
    housePriceInput.min = offerTypeToMinPrice[houseType];
    housePriceInput.placeholder = offerTypeToMinPrice[houseType];
  };

  var validateRoom = function () {
    capacitySelect.setCustomValidity('');

    if (roomSelect.value === '1') {
      if (capacitySelect.value === '3' || capacitySelect.value === '2' || capacitySelect.value === '0') {
        capacitySelect.setCustomValidity('для одной комнаты выберите вариант "для 1 гостя"');
      }
    } else if (roomSelect.value === '2') {
      if (capacitySelect.value === '3' || capacitySelect.value === '0') {
        capacitySelect.setCustomValidity('для 2х комнат выберите варианты "«для 2 гостей» или «для 1 гостя»');
      }
    } else if (roomSelect.value === '3') {
      if (capacitySelect.value === '0') {
        capacitySelect.setCustomValidity('для 3х комнат выберите варианты «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      }
    } else if (roomSelect.value === '100') {
      if (capacitySelect.value === '3' || capacitySelect.value === '2' || capacitySelect.value === '1') {
        capacitySelect.setCustomValidity('для 100 комнат выберите вариант "не для гостей"');
      }
    }
  };

  var onRoomSelectChange = function () {
    validateRoom();
  };
  var onCapacitySelectChange = function () {
    validateRoom();
  };

  var resetAdForm = function () {
    adForm.reset();
    mapFilters.reset();
    disableElems();
    mapPin.style.top = DEFAULT_COORDS_Y + 'px';
    mapPin.style.left = DEFAULT_COORDS_X + 'px';
    setAddress(setPinDefaultCoords());
    setMinPriceValue(housingTypes.value);
    validateRoom();
    window.render.removePins();
    window.render.removeCard();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onLoad, window.util.onError);
  };

  var onLoad = function () {
    var successNode = similarSuccessTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successNode);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closeSuccess);
    resetAdForm();
  };

  var closeSuccess = function () {
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
      document.removeEventListener('keydown', onSuccessEscPress);
    }
  };

  var onSuccessEscPress = function () {
    if (window.util.isEscPressed) {
      closeSuccess();
    }
  };

  housingTypes.addEventListener('change', function () {
    setMinPriceValue(housingTypes.value);
  });

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  roomSelect.addEventListener('change', onRoomSelectChange);
  capacitySelect.addEventListener('change', onCapacitySelectChange);
  resetButton.addEventListener('click', resetAdForm);
  adForm.addEventListener('submit', onFormSubmit);


  disableElems();
  setAddress(setPinDefaultCoords());
  setMinPriceValue(housingTypes.value);
  validateRoom();

  window.form = {
    adForm: adForm,
    setAddress: setAddress,
    enableElems: enableElems,
  };

})();
