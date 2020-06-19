'use strict';

(function card() {

  var pinElements = document.querySelectorAll('.map__pin img');
  var pinContainerElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  function onContainerClick() {
    pinContainerElement.addEventListener('click', onPinsClick);
  }

  function onPinsClick(elem) {
    var ii = 0;
    pinElements. forEach(function (element, i) {
      if (i > 0) {
        if (pinElements[i].src === elem.target.src) {
          ii = i;
          cardFormActive(ii);
        }
      }
    });
  }

  function cardFormActive(el) {
    onContainerClickBreak();
    fragment.appendChild(makeCardElement(window.data.resultGen[el - 1]));
    var mapCardElement = document.querySelector('.map');
    var mapCardBeforeElement = document.querySelector('.map__filters-container');
    mapCardElement.insertBefore(fragment, mapCardBeforeElement);
    onPopupClose();
  }

  function onContainerClickBreak() {
    pinContainerElement.removeEventListener('click', onPinsClick);
  }

  onContainerClick();

  function onPopupClose() {
    document.querySelector('.map__card').querySelector('.popup__close').addEventListener('click', cardFormClose);
  }

  function cardFormClose() {
    var mapCardElement = document.querySelector('.map__card');
    mapCardElement.remove();
    onContainerClick();
  }

  function generateSrcPhoto(arr, classElem, cardElem, classBlock) {
    var cardTempElement = cardElem.querySelector(classElem);
    var cardBlockElement = cardElem.querySelector(classBlock);
    cardTempElement.src = arr[0];
    arr.forEach(function (el, i) {
      if (i > 0) {
        var cardEl = cardTempElement.cloneNode(true);
        cardEl.src = el;
        fragment.appendChild(cardEl);
      }
    });
    cardBlockElement.appendChild(fragment);

  }

  function generateFeature(arr, cardElem, classElem) {
    arr.forEach(function (elem) {
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

  function makeCardElement(arr) {

    var cardTemplateElement = document.querySelector('#card').content;
    var cardElement = cardTemplateElement.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = arr.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = arr.offer.type;
    cardElement.querySelector('.popup__description').textContent = arr.offer.description;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнат(ы) для ' + arr.offer.guests + ' гостей';
    cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
    generateSrcPhoto(arr.offer.photos, '.popup__photo', cardElement, '.popup__photos');
    generateFeature(arr.offer.features, cardElement, '.popup__feature');
    return cardElement;
  }

})();
