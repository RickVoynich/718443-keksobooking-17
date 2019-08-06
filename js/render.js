'use strict';

(function () {

  var PIN_QUANTITY = 5;
  var map = document.querySelector('.map');
  var pinListElement = document.querySelector('.map__pins');
  var pinPointTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();

  var renderPin = function (pin) {
    var pinElement = pinPointTemplate.cloneNode(true);
    pinElement.id = 'pin-' + pin.id;
    var pinImage = pinElement.querySelector('img');
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.type;
    pinElement.style = 'left: ' + pin.location.x + 'px;' + 'top: ' + pin.location.y + 'px';
    return pinElement;
  };

  var createPins = function (array) {
    var pinsArray = array.slice(0, PIN_QUANTITY);
    pinsArray.forEach(function (element) {
      if (element.offer) {
        fragment.appendChild(renderPin(element));
      }
    });
    pinListElement.appendChild(fragment);
  };

  var removePins = function () {
    var allPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (currentPin) {
      currentPin.parentNode.removeChild(currentPin);
    });
  };

  var renderCard = function (obj) {
    var cardElement = similarCardTemplate.cloneNode(true);

    var popupTitle = cardElement.querySelector('.popup__title');
    popupTitle.textContent = '';
    if (obj.offer.title) {
      popupTitle.textContent = obj.offer.title;
    }

    var popupAddress = cardElement.querySelector('.popup__text--address');
    popupAddress.textContent = '';
    if (obj.offer.address) {
      popupAddress.textContent = obj.offer.address;
    }

    var popupPrice = cardElement.querySelector('.popup__text--price');
    popupPrice.textContent = '';
    if (obj.offer.price) {
      popupPrice.textContent = obj.offer.price + '₽/ночь';
    }

    var popupTime = cardElement.querySelector('.popup__text--time');
    popupTime.textContent = '';
    if (obj.offer.checkin && obj.offer.checkout) {
      popupTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    }

    var popupDescription = cardElement.querySelector('.popup__description');
    popupDescription.textContent = '';
    if (obj.offer.description) {
      popupDescription.textContent = obj.offer.description;
    }

    var popupAvatar = cardElement.querySelector('.popup__avatar');
    popupAvatar.src = '';
    if (obj.author.avatar) {
      popupAvatar.src = obj.author.avatar;
    }

    var capacityHouse = cardElement.querySelector('.popup__text--capacity');
    capacityHouse.textContent = '';
    if (obj.offer.rooms > 0 && obj.offer.guests > 0) {
      capacityHouse.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    }

    var popupHouseType = cardElement.querySelector('.popup__type');
    switch (obj.offer.type) {
      case 'flat':
        popupHouseType.textContent = 'Квартира';
        break;
      case 'bungalo':
        popupHouseType.textContent = 'Бунгало';
        break;
      case 'house':
        popupHouseType.textContent = 'Дом';
        break;
      case 'palace':
        popupHouseType.textContent = 'Дворец';
        break;
    }

    var popupFeatures = cardElement.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    if (obj.offer.features.length) {
      obj.offer.features.forEach(function (element) {
        popupFeatures.innerHTML += '<li class="popup__feature popup__feature--' + element + '"></li>';
      });
    }

    var popupPhotos = cardElement.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';
    if (obj.offer.photos.length) {
      obj.offer.photos.forEach(function (element) {
        popupPhotos.innerHTML += '<img src="' + element + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      });
    }

    return cardElement;
  };

  var createCard = function (array) {
    fragment.appendChild(renderCard(array));
    mapFiltersContainer.after(fragment);
  };

  var removeCard = function () {
    var card = map.querySelector('.map__card');
    if (card) {
      card.remove();
    }
  };

  window.render = {
    createPins: createPins,
    removePins: removePins,
    createCard: createCard,
    removeCard: removeCard
  };

})();
