'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500; // ms

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

  // Фильтрация
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters-container');
  var mapFilterForm = mapFilter.querySelector('.map__filters');
  var selectHousingType = mapFilterForm.querySelector('#housing-type');
  var selectHousingFeatures = mapFilterForm.querySelector('#housing-features').querySelectorAll('input');

  var updatePins = function () {
    window.render.removePins();
    var filteredPins = window.pins.slice();
    var typeOfHouse = selectHousingType.value;
    if (selectHousingType.value !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.type === typeOfHouse;
      });
    }

    window.render.renderPins(filteredPins);
  };

  selectHousingType.addEventListener('change', debounce(updatePins, 500));

  for (var i = 0; i < selectHousingFeatures.length; i++) {
    selectHousingFeatures[i].addEventListener('click', function () {
      for (i = 0; i < selectHousingFeatures.length; i++) {
        window.render.removePins();
        updatePins();
      }
    });
  }

})();
