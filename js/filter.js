'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var MIN_HOUSING_PRICE = 10000;
  var MAX_HOUSING_PRICE = 50000;

  var selectHousingTypeElem = window.form.mapFiltersElem.querySelector('#housing-type');
  var selectHousingPriceElem = window.form.mapFiltersElem.querySelector('#housing-price');
  var selectHousingRoomsElem = window.form.mapFiltersElem.querySelector('#housing-rooms');
  var selectHousingGuestsElem = window.form.mapFiltersElem.querySelector('#housing-guests');

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var isCheckType = function (pin) {
    var housingType = selectHousingTypeElem.value;
    return housingType === 'any' || pin.offer.type === housingType;
  };

  var isCheckPrice = function (pin) {
    var housingPrice = selectHousingPriceElem.value;
    switch (housingPrice) {
      case 'low':
        return pin.offer.price < MIN_HOUSING_PRICE;
      case 'middle':
        return pin.offer.price >= MIN_HOUSING_PRICE && pin.offer.price <= MAX_HOUSING_PRICE;
      case 'high':
        return pin.offer.price > MAX_HOUSING_PRICE;
      default:
        return true;
    }
  };

  var isCheckRooms = function (pin) {
    var housingRooms = selectHousingRoomsElem.value;
    return housingRooms === 'any' || pin.offer.rooms === +housingRooms;
  };

  var isCheckGuests = function (pin) {
    var housingGuests = selectHousingGuestsElem.value;
    return housingGuests === 'any' || pin.offer.guests === +housingGuests;
  };

  var isCheckFeatures = function (pin) {
    var checkedFeatures = window.form.mapFiltersElem.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (element) {
      return pin.offer.features.includes(element.value);
    });
  };

  var updatePins = function () {
    window.render.removePins();
    window.render.removeCard();
    var filteredPins = window.pins.slice();
    filteredPins = filteredPins.filter(function (pin) {
      return isCheckType(pin)
        && isCheckPrice(pin)
        && isCheckRooms(pin)
        && isCheckGuests(pin)
        && isCheckFeatures(pin);
    });

    window.render.createPins(filteredPins);
  };

  window.form.mapFiltersElem.addEventListener('change', debounce(updatePins));

})();
