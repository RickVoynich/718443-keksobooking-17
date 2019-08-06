'use strict';

(function () {

  var DEFAULT_COORDS_X = 570;
  var DEFAULT_COORDS_Y = 375;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');
  var mapFilters = map.querySelector('.map__filters');
  var mapFilterForm = map.querySelectorAll('.map__filter');
  var mapFeatures = map.querySelectorAll('.map__features');
  var mapPin = document.querySelector('.map__pin--main');


  var blockForm = function () {
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    window.util.addDisabled(fieldsetAdForm);
    window.util.addDisabled(mapFilterForm);
    window.util.addDisabled(mapFeatures);
  };

  blockForm();

  var unblockForm = function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    window.util.removeDisabled(fieldsetAdForm);
    window.util.removeDisabled(mapFilterForm);
    window.util.removeDisabled(mapFeatures);
  };

  var address = adForm.querySelector('#address');
  var setAddress = function (coordinates) {
    address.value = coordinates.x + ', ' + coordinates.y;
  };

  var setPinDefaultCoords = function () {
    return {
      x: DEFAULT_COORDS_X + Math.round(window.util.PIN_SIZE / 2),
      y: DEFAULT_COORDS_Y + Math.round(window.util.PIN_SIZE / 2)
    };
  };

  setAddress(setPinDefaultCoords());

  var housingTypes = document.querySelector('#type');
  var housePriceInput = document.querySelector('#price');

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

  setMinPriceValue(housingTypes.value);

  housingTypes.addEventListener('change', function () {
    setMinPriceValue(housingTypes.value);
  });

  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');

  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });

  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });

  var roomSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');

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

  validateRoom();

  roomSelect.addEventListener('change', validateRoom);
  capacitySelect.addEventListener('change', validateRoom);

  var resetAdForm = function () {
    adForm.reset();
    mapFilters.reset();
    blockForm();

    mapPin.style.top = DEFAULT_COORDS_Y + 'px';
    mapPin.style.left = DEFAULT_COORDS_X + 'px';
    setAddress(setPinDefaultCoords());

    window.render.removePins();
    window.render.removeCard();
  };

  var resetButton = adForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', resetAdForm);

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onLoad,  window.util.onError);
  };

  adForm.addEventListener('submit', onFormSubmit);


  var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
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

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSuccess();
    }
  };



  window.form = {
    adForm: adForm,
    setAddress: setAddress,
    unblockForm: unblockForm
  };

})();
