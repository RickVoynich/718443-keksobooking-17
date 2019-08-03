'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');
  var mapFilterForm = map.querySelectorAll('.map__filter');
  var mapFiltersFields = mapFilterForm.children;
  var mapFeatures = map.querySelectorAll('.map__features');

  window.util.addDisabled(fieldsetAdForm);
  window.util.addDisabled(mapFilterForm);
  window.util.addDisabled(mapFeatures);

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

  window.form = {
    map: map,
    adForm: adForm,
    mapFiltersFields: mapFiltersFields,
    setAddress: setAddress,
    unblockForm: unblockForm
  };

})();
