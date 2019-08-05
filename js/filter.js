'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;

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

  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapFilterForm = mapFilter.querySelector('.map__filters');
  var selectHousingType = mapFilterForm.querySelector('#housing-type');
  var selectHousingPrice = mapFilterForm.querySelector('#housing-price');
  var selectHousingRooms = mapFilterForm.querySelector('#housing-rooms');
  var selectHousingGuests = mapFilterForm.querySelector('#housing-guests');
  var selectHousingFeatures = mapFilterForm.querySelector('#housing-features').querySelectorAll('input');


  var isCheckType = function (pin) {
    var typeOfHouse = selectHousingType.value;
    if (typeOfHouse === 'any') {
      return true;
    }
    return pin.offer.type === typeOfHouse;
  };


  var updatePins = function () {
    window.render.removePins();
    window.render.removeCard();
    var filteredPins = window.pins.slice();
filteredPins = filteredPins.filter(function(pin) {
  return isCheckType(pin);
  //&& isCheckPrice(pin);
});


    var housingPrice = selectHousingPrice.value;
    if (housingPrice !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        switch (housingPrice) {
          case 'low':
            return pin.offer.price < 10000;
          case 'middle':
            return pin.offer.price >= 10000 && pin.offer.price <= 50000;
          case 'high':
            return pin.offer.price > 50000;
          default:
            return true;
        }
      });
    }
    var housingRooms = selectHousingRooms.value;
    if (housingRooms !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return pin.offer.rooms === +housingRooms;
      });
    }
    var housingGuests = selectHousingGuests.value;
    if (housingGuests !== 'any') {
      filteredPins = filteredPins.filter(function (pin) {
        return pin.offer.guests === +housingGuests;
      });
    }
    for (var i = 0; i < selectHousingFeatures.length; i++) {
      if (selectHousingFeatures[i].checked) {
        filteredPins = filteredPins.filter(function (pin) {
          return pin.offer.features.includes(selectHousingFeatures[i].value);
        });
      }
    }

    window.render.renderPins(filteredPins);
  };

  selectHousingType.addEventListener('change', debounce(updatePins));
  selectHousingPrice.addEventListener('change', debounce(updatePins));
  selectHousingRooms.addEventListener('change', debounce(updatePins));
  selectHousingGuests.addEventListener('change', debounce(updatePins));

  for (var i = 0; i < selectHousingFeatures.length; i++) {
    selectHousingFeatures[i].addEventListener('click', debounce(updatePins));
  }

})();
