'use strict';

(function () {

  var PIN_QUANTITY = 5;
  var pinContainerElem = window.util.mapContainerElem.querySelector('.map__pins');
  var filtersContainerElem = window.util.mapContainerElem.querySelector('.map__filters-container');
  var pinTemplateElem = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplateElem = document.querySelector('#card').content.querySelector('.map__card');
  var fragment = document.createDocumentFragment();

  var renderPin = function (pin) {
    var pinElement = pinTemplateElem.cloneNode(true);
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
    pinContainerElem.appendChild(fragment);
  };

  var removePins = function () {
    var allPinsElems = window.util.mapContainerElem.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPinsElems.forEach(function (currentPin) {
      currentPin.parentNode.removeChild(currentPin);
    });
  };

  var isCheckTitle = function (cardElem, card) {
    var cardTitleElem = cardElem.querySelector('.popup__title');
    cardTitleElem.textContent = '';
    if (card.offer.title) {
      cardTitleElem.textContent = card.offer.title;
    }
  };

  var isCheckAddress = function (cardElem, card) {
    var cardAddressElem = cardElem.querySelector('.popup__text--address');
    cardAddressElem.textContent = '';
    if (card.offer.address) {
      cardAddressElem.textContent = card.offer.address;
    }
  };

  var isCheckPrice = function (cardElem, card) {
    var cardPriceElem = cardElem.querySelector('.popup__text--price');
    cardPriceElem.textContent = '';
    if (card.offer.price) {
      cardPriceElem.textContent = card.offer.price + '₽/ночь';
    }
  };

  var isCheckTime = function (cardElem, card) {
    var cardTimeElem = cardElem.querySelector('.popup__text--time');
    cardTimeElem.textContent = '';
    if (card.offer.checkin && card.offer.checkout) {
      cardTimeElem.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    }
  };

  var isCheckDescription = function (cardElem, card) {
    var cardDescriptionElem = cardElem.querySelector('.popup__description');
    cardDescriptionElem.textContent = '';
    if (card.offer.description) {
      cardDescriptionElem.textContent = card.offer.description;
    }
  };

  var isCheckAvatar = function (cardElem, card) {
    var cardAvatarElem = cardElem.querySelector('.popup__avatar');
    cardAvatarElem.src = '';
    if (card.author.avatar) {
      cardAvatarElem.src = card.author.avatar;
    }
  };

  var isCheckCapacity = function (cardElem, card) {
    var houseCapacityElem = cardElem.querySelector('.popup__text--capacity');
    houseCapacityElem.textContent = '';
    if (card.offer.rooms > 0 && card.offer.guests > 0) {
      houseCapacityElem.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    }
  };

  var isCheckHouseType = function (cardElem, card) {
    var houseTypeElem = cardElem.querySelector('.popup__type');
    switch (card.offer.type) {
      case 'flat':
        houseTypeElem.textContent = 'Квартира';
        break;
      case 'bungalo':
        houseTypeElem.textContent = 'Бунгало';
        break;
      case 'house':
        houseTypeElem.textContent = 'Дом';
        break;
      case 'palace':
        houseTypeElem.textContent = 'Дворец';
        break;
    }
  };

  var isCheckFeatures = function (cardElem, card) {
    var cardFeaturesElem = cardElem.querySelector('.popup__features');
    cardFeaturesElem.innerHTML = '';
    if (card.offer.features.length) {
      card.offer.features.forEach(function (element) {
        cardFeaturesElem.innerHTML += '<li class="popup__feature popup__feature--' + element + '"></li>';
      });
    }
  };

  var isCheckPhotos = function (cardElem, card) {
    var cardPhotosElem = cardElem.querySelector('.popup__photos');
    cardPhotosElem.innerHTML = '';
    if (card.offer.photos.length) {
      card.offer.photos.forEach(function (element) {
        cardPhotosElem.innerHTML += '<img src="' + element + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      });
    }
  };

  var renderCard = function (cardArr) {
    var cardElement = cardTemplateElem.cloneNode(true);

    isCheckTitle(cardElement, cardArr);
    isCheckPrice(cardElement, cardArr);
    isCheckAddress(cardElement, cardArr);
    isCheckTime(cardElement, cardArr);
    isCheckDescription(cardElement, cardArr);
    isCheckAvatar(cardElement, cardArr);
    isCheckCapacity(cardElement, cardArr);
    isCheckHouseType(cardElement, cardArr);
    isCheckFeatures(cardElement, cardArr);
    isCheckPhotos(cardElement, cardArr);

    return cardElement;
  };

  var createCard = function (array) {
    fragment.appendChild(renderCard(array));
    filtersContainerElem.after(fragment);
  };

  var removeCard = function () {
    var cardElem = window.util.mapContainerElem.querySelector('.map__card');
    if (cardElem) {
      cardElem.remove();
    }
  };

  window.render = {
    createPins: createPins,
    removePins: removePins,
    createCard: createCard,
    removeCard: removeCard
  };

})();
