'use strict';

(function () {

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');
  var mapFilterForm = map.querySelectorAll('.map__filter');
  var mapFeatures = map.querySelectorAll('.map__features');
  var mapPin = document.querySelector('.map__pin--main');
  var DEFAULT_COORDS_X = 570;
  var DEFAULT_COORDS_Y = 375;

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

  var roomSelectChange = function () {
    for (var k = 0; k < capacitySelect.children.length; k++) {
      capacitySelect.children[k].disabled = true;
    }
    switch (true) {
      case roomSelect.querySelector('[value="1"]').selected:
        capacitySelect.querySelector('[value="1"]').disabled = false;
        capacitySelect.querySelector('[value="1"]').selected = true;
        break;
      case roomSelect.querySelector('[value="2"]').selected:
        capacitySelect.querySelector('[value="1"]').disabled = false;
        capacitySelect.querySelector('[value="2"]').disabled = false;
        break;
      case roomSelect.querySelector('[value="3"]').selected:
        capacitySelect.querySelector('[value="1"]').disabled = false;
        capacitySelect.querySelector('[value="2"]').disabled = false;
        capacitySelect.querySelector('[value="3"]').disabled = false;
        break;
      case roomSelect.querySelector('[value="100"]').selected:
        capacitySelect.querySelector('[value="0"]').disabled = false;
        capacitySelect.querySelector('[value="0"]').selected = true;
        break;
    }
  };

  roomSelect.addEventListener('change', roomSelectChange);
  capacitySelect.addEventListener('change', roomSelectChange);

  var resetAdForm = function () {
    adForm.reset();
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
    window.backend.save(new FormData(adForm), onLoad, onError);
  };

  adForm.addEventListener('submit', onFormSubmit);

  var similarSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var similarErrorTemplate = document.querySelector('#error').content.querySelector('.error');

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

  var onSuccessEscPress = function (e) {
    if (e.keyCode === window.util.ESC_KEYCODE) {
      closeSuccess();
    }
  };

  var onError = function () {
    var errorNode = similarErrorTemplate.cloneNode(true);
    document.querySelector('main').appendChild(errorNode);

    var errorButton = document.querySelector('.error__button');
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', closeError);
    errorButton.addEventListener('click', closeError);
  };

  var closeError = function () {
    var error = document.querySelector('.error');
    if (error) {
      error.remove();
      document.removeEventListener('keydown', onErrorEscPress);
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeError();
    }
  };

  window.form = {
    adForm: adForm,
    setAddress: setAddress,
    unblockForm: unblockForm,
    roomSelectChange: roomSelectChange
  };

})();
