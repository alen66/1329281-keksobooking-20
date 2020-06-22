'use strict';

(function card() {

  var pinElements = document.querySelectorAll('.map__pin img');
  var fragment = document.createDocumentFragment();

  function onPinsClick() {
    pinElements.forEach(function (element, index) {
      element.setAttribute('data-index', index);
      element.addEventListener('click', openCard);
    });
  }

  function openCard(elem) {
    var pinClick = +elem.target.dataset.index;
    if (pinClick !== 0) {
      cardFormActive(pinClick);
    }
  }

  function cardFormActive(el) {
    onPinsClickBreak();
    fragment.appendChild(makeCardElement(window.data.resultGen[el - 1]));
    var mapCardElement = document.querySelector('.map');
    var mapCardBeforeElement = document.querySelector('.map__filters-container');
    mapCardElement.insertBefore(fragment, mapCardBeforeElement);
    onPopupClose();
  }

  function onPinsClickBreak() {
    pinElements.forEach(function (element) {
      element.removeEventListener('click', openCard);
    });
  }

  onPinsClick();

  function onPopupClose() {
    document.querySelector('.map__card').querySelector('.popup__close').addEventListener('click', cardFormClose);
  }

  function cardFormClose() {
    document.querySelector('.map__card').remove();
    onPinsClick();
  }

  function generateSrcPhoto(imageUrls, classElem, cardElem, classBlock) {
    var cardTempElement = cardElem.querySelector(classElem);
    var cardBlockElement = cardElem.querySelector(classBlock);
    for (var i = 0; i < imageUrls.length - 1; i++) {
      fragment.appendChild(cardTempElement.cloneNode(true));
    }

    cardBlockElement.appendChild(fragment);
    var cardInBlockElements = cardBlockElement.querySelectorAll(classElem);
    cardInBlockElements.forEach(function (el, imageUrl) {
      cardInBlockElements[imageUrl].src = imageUrls[imageUrl];
    });
  }

  function generateFeature(arrFeature, cardElem, classElem) {
    arrFeature.forEach(function (elem) {
      var perem = classElem + '--' + elem;
      cardElem.querySelector(perem).textContent = elem;
    });

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
    cardElement.querySelector('.popup__type').textContent = arrData.offer.type;
    cardElement.querySelector('.popup__description').textContent = arrData.offer.description;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrData.offer.checkin + ', выезд до ' + arrData.offer.checkout;
    cardElement.querySelector('.popup__text--capacity').textContent = arrData.offer.rooms + ' комнат(ы) для ' + arrData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__avatar').src = arrData.author.avatar;
    generateSrcPhoto(arrData.offer.photos, '.popup__photo', cardElement, '.popup__photos');
    generateFeature(arrData.offer.features, cardElement, '.popup__feature');
    return cardElement;
  }

})();
