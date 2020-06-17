'use strict';

(function map() {
  var mapElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  function makeElement(arr) {

    var pinTemplateElement = document.querySelector('#pin').content;
    var pinButtonElement = pinTemplateElement.querySelector('.map__pin');
    var pinElement = pinButtonElement.cloneNode(true);

    pinElement.querySelector('img').src = arr.author.avatar;
    pinElement.querySelector('img').alt = arr.offer.title;
    pinElement.style = 'left:' + (arr.location.x + window.data.X) + 'px; top: ' + (arr.location.y + window.data.Y) + 'px;';

    return pinElement;
  }

  window.data.resultGen.forEach(function (el) {
    fragment.appendChild(makeElement(el));
  });

  mapElement.appendChild(fragment);

  function generateSrcPhoto(arr, classElem, cardElem, classBlock) {
    var cardTempElement = cardElem.querySelector(classElem);
    var cardBlockElement = cardElem.querySelector(classBlock);
    cardTempElement.src = arr[0];
    arr.forEach(function (el) {
      var cardEl = cardTempElement.cloneNode(true);
      cardEl.src = el;
      fragment.appendChild(cardEl);
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
    /*  cardElement.querySelector('.popup__type').textContent = generateObjectValue(MOCK_TYPE, VALUE_MOCK_TYPE, [arr.offer.type]);*/
    cardElement.querySelector('.popup__type').textContent = arr.offer.type;
    cardElement.querySelector('.popup__description').textContent = arr.offer.description;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнат(ы) для ' + arr.offer.guests + ' гостей';
    cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
    generateSrcPhoto(arr.offer.photos, '.popup__photo', cardElement, '.popup__photos');
    generateFeature(arr.offer.features, cardElement, '.popup__feature');
    return cardElement;
  }

  fragment.appendChild(makeCardElement(window.data.resultGen[0]));

  var mapCardElement = document.querySelector('.map');
  var mapCardBeforeElement = document.querySelector('.map__filters-container');

  mapCardElement.insertBefore(fragment, mapCardBeforeElement);
})();
