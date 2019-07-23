'use strict';

(function () {

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

})();
