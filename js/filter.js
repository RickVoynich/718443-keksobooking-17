'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var MIN_HOUSING_PRICE = 10000;
  var MAX_HOUSING_PRICE = 50000;
  var mapFilters = document.querySelector('.map__filters');
  var selectHousingType = mapFilters.querySelector('#housing-type');
  var selectHousingPrice = mapFilters.querySelector('#housing-price');
  var selectHousingRooms = mapFilters.querySelector('#housing-rooms');
  var selectHousingGuests = mapFilters.querySelector('#housing-guests');

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
    var typeOfHouse = selectHousingType.value;
    return typeOfHouse === 'any' ? true : pin.offer.type === typeOfHouse;
  };

  var isCheckPrice = function (pin) {
    var housingPrice = selectHousingPrice.value;
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
    var housingRooms = selectHousingRooms.value;
    return housingRooms === 'any' ? true : pin.offer.rooms === +housingRooms;
  };

  var isCheckGuests = function (pin) {
    var housingGuests = selectHousingGuests.value;
    return housingGuests === 'any' ? true : pin.offer.guests === +housingGuests;
  };

  var isCheckFeatures = function (pin) {
    var checkedFeatures = mapFilters.querySelectorAll('input:checked');
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

    window.render.renderPins(filteredPins);
  };

  mapFilters.addEventListener('change', debounce(updatePins));

})();
