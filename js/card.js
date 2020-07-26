'use strict';

(function card() {
  var TYPE_HOUSE = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var ESC_PRESS = 27;
  var ENTER_PRESS = 13;

  var pinElements = '';

  function findPinElements() {
    pinElements = document.querySelectorAll('img[data-index]');
    onPinsClick();
  }

  var fragment = document.createDocumentFragment();

  function onEnterOpenCard(evt) {
    if (evt.keyCode === ENTER_PRESS) {
      openCard(evt);
    }
  }

  function onPinsClick() {
    pinElements.forEach(function (element) {
      element.addEventListener('click', openCard);
      element.parentNode.addEventListener('keydown', onEnterOpenCard);
    });
  }

  function removeActiveClass() {
    var buttonActiveElement = document.querySelector('.map__pin--active');
    if (buttonActiveElement) {
      buttonActiveElement.classList.remove('map__pin--active');
    }
  }

  function openCard(elem) {
    var pinClick;
    removeActiveClass();

    if (elem.button === 0) {
      elem.target.parentNode.classList.add('map__pin--active');
      pinClick = +elem.target.dataset.index;
    } else {
      elem.target.classList.add('map__pin--active');
      pinClick = +elem.target.children[0].dataset.index;
    }

    cardFormActivate(pinClick);
  }


  function cardFormActivate(el) {
    var cardOpenElement = document.querySelector('.map__card');
    if (cardOpenElement) {
      cardFormClose(el);
    }

    fragment.appendChild(makeCardElement(window.resultFilterNumber[el]));
    var mapCardBeforeElement = document.querySelector('.map__filters-container');
    window.main.mapCardElement.insertBefore(fragment, mapCardBeforeElement);
    onPopupClose();
  }

  function onEscPress(evt) {
    if (evt.keyCode === ESC_PRESS) {
      removeActiveClass();
      cardFormClose();
    }
  }

  function onPopupClose() {
    document.querySelector('.map__card').querySelector('.popup__close').addEventListener('click', cardFormClose);
    document.addEventListener('keydown', onEscPress);
  }

  function cardFormClose() {
    pinElements.forEach(function (element) {

      element.removeEventListener('click', openCard);
      element.parentNode.removeEventListener('keydown', onEnterOpenCard);
    });

    document.querySelector('.map__card').querySelector('.popup__close').removeEventListener('click', cardFormClose);
    document.removeEventListener('keydown', onEscPress);
    document.querySelector('.map__card').remove();

    onPinsClick();
  }

  function generateSrcPhoto(imageUrls, classElem, cardElem, classBlock) {
    var cardTempElement = cardElem.querySelector(classElem);
    var cardBlockElement = cardElem.querySelector(classBlock);
    if (imageUrls.length > 0) {
      for (var i = 0; i < imageUrls.length - 1; i++) {
        fragment.appendChild(cardTempElement.cloneNode(true));
      }
      cardBlockElement.appendChild(fragment);
      var cardInBlockElements = cardBlockElement.querySelectorAll(classElem);
      cardInBlockElements.forEach(function (el, imageUrl) {
        cardInBlockElements[imageUrl].src = imageUrls[imageUrl];
      });
    } else {
      cardTempElement.remove();
    }
  }


  function generateFeature(arrFeature, cardElem, classElem) {
    arrFeature.forEach(function (elem) {
      var perem = classElem + '--' + elem;
      cardElem.querySelector(perem).textContent = elem;
    });

    if (arrFeature.length === 0) {
      cardElem.querySelector('.popup__features').style.display = 'none';
    }

    var ulNodeList = cardElem.querySelectorAll(classElem);
    ulNodeList.forEach(function (el) {
      if (el.innerText === '') {
        el.style.display = 'none';
      }
    });
  }

  function makeCardElement(arrData) {
    var cardTemplateElement = document.querySelector('#card').content;
    var cardElement = cardTemplateElement.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = arrData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arrData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arrData.offer.price + '₽/ночь';
    var key = arrData.offer.type;
    cardElement.querySelector('.popup__type').textContent = TYPE_HOUSE[key];
    cardElement.querySelector('.popup__description').textContent = arrData.offer.description;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrData.offer.checkin + ', выезд до ' + arrData.offer.checkout;
    cardElement.querySelector('.popup__text--capacity').textContent = arrData.offer.rooms + ' комнат(ы) для ' + arrData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__avatar').src = arrData.author.avatar;
    generateSrcPhoto(arrData.offer.photos, '.popup__photo', cardElement, '.popup__photos');
    generateFeature(arrData.offer.features, cardElement, '.popup__feature');
    return cardElement;
  }

  window.card = {
    findPinElements: findPinElements
  };

})();
