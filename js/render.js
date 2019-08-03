'use strict';

(function () {
  var map = document.querySelector('.map');
  var PIN_QUANTITY = 5;
  var pinListElement = document.querySelector('.map__pins');
  var pinPointTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // рендер пинов
  var renderPin = function (pin) {
    var pinElement = pinPointTemplate.cloneNode(true);
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;
    pinElement.style = 'left: ' + pin.location.x + 'px;' + 'top: ' + pin.location.y + 'px';
    return pinElement;
  };

  // отрисовка пинов
  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < PIN_QUANTITY; j++) {
      fragment.appendChild(renderPin(array[j]));
    }
    pinListElement.appendChild(fragment);
  };

  // удаление пинов
  var removePins = function () {
    var allPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (currentPin) {
      currentPin.parentNode.removeChild(currentPin);
    });
  };

  // рендер карточки
  var renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';

    var typeHouse;
    switch (card.offer.type) {
      case 'flat':
        typeHouse = 'Квартира';
        break;
      case 'bungalo':
        typeHouse = 'Бунгало';
        break;
      case 'house':
        typeHouse = 'Дом';
        break;
      case 'palace':
        typeHouse = 'Дворец';
        break;
    };
    cardElement.querySelector('.popup__type').textContent = typeHouse;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var featuresHouse = cardElement.querySelector('.popup__features');
    featuresHouse.innerHTML = '';
    for (var i = 0; i < card.offer.features.length; i++) {
      featuresHouse.innerHTML += '<li class="popup__feature popup__feature--' + card.offer.features[i] + '"></li>';
    };

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var photosHouse = cardElement.querySelector('.popup__photos');
    photosHouse.innerHTML = '';
    for (i = 0; i < card.offer.photos.length; i++) {
      photosHouse.innerHTML += '<img src="' + card.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupAvatar.src = card.author.avatar;

    return cardElement;
  };

  // отрисовка карточки
  var mapFilter = map.querySelector('.map__filters-container');
  var renderCards = function (array) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(array[0]));

    mapFilter.after(fragment);
  };

  // удаление карточки
  var removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  window.render = {
    renderPins: renderPins,
    removePins: removePins,
    renderCards: renderCards,
    removeCard: removeCard
  };

})();
