'use strict';

var NUMBER_OF_ASVERSMENTS = 8;
var MOCK_TITLES = ['Внимание! Скидка!', 'Только для вас', 'Бизнесменам', 'Чудесное предложение для молодоженов', 'Для туристов', 'На длительное время', 'Даром', 'Не дорого!'];
var MOCK_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MOCK_CHECKIN = ['12:00', '13:00', '14:00'];
var MOCK_CHECKOUT = ['12:00', '13:00', '14:00'];
var MOCK_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MOCK_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var X = 50;
var Y = 70;
var VALUE_MOCK_TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomValueFromArray(arr) {
  return arr[generateRandomNumber(0, arr.length - 1)];
}

function generateArrRandomLength(arr) {
  var result = [];
  var j = generateRandomNumber(1, arr.length);
  for (var i = 0; i < j; i++) {
    var ad = arr[i];
    result.push(ad);
  }
  return result;
}

function generateData() {
  var result = [];
  for (var i = 1; i <= NUMBER_OF_ASVERSMENTS; i++) {
    var adX = generateRandomNumber(0, 500);
    var adY = generateRandomNumber(130, 630);
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
      },
      'offer': {
        'title': generateRandomValueFromArray(MOCK_TITLES),
        'address': adX  + ',' + adY,
        'price': generateRandomNumber(1500, 10000),
        'type': generateRandomValueFromArray(MOCK_TYPE),
        'rooms': generateRandomNumber(1, 6),
        'guests': generateRandomNumber(1, 10),
        'checkin': generateRandomValueFromArray(MOCK_CHECKIN),
        'checkout': generateRandomValueFromArray(MOCK_CHECKOUT),
        'features': generateArrRandomLength(MOCK_FEATURES),
        'description': 'Великолепная квартира-студия в центре Токио.',
        'photos': generateArrRandomLength(MOCK_PHOTOS)},
      'location': {
        'x': adX,
        'y': adY}
    };
    result.push(ad);
  }
  return result;
}

var resultGen = generateData();
var mapElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

function makeElement(arr) {

  var pinTemplate = document.querySelector('#pin').content;
  var pinButton = pinTemplate.querySelector('.map__pin');
  var pinElement = pinButton.cloneNode(true);

  pinElement.querySelector('img').src = arr.author.avatar;
  pinElement.querySelector('img').alt = arr.offer.title;
  pinElement.style = 'left:' + (arr.location.x + X) + 'px; top: ' + (arr.location.y + Y) + 'px;';

  return pinElement;
}

resultGen.forEach(function (el) {
  fragment.appendChild(makeElement(el));
});

mapElement.appendChild(fragment);

var mapFaded = document.querySelector('.map');
mapFaded.classList.remove('map--faded');

function generateObjectValue(keys, values, perem) {
  var obj = {};
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj[perem];
}

function generateSrcPhoto(arr, classElem, cardElem, classBlock) {
  var cardTemp = cardElem.querySelector(classElem);
  var cardBlock = cardElem.querySelector(classBlock);
  cardTemp.src = arr[0];
  arr.forEach(function (el) {
    var cardEl = cardTemp.cloneNode(true);
    cardEl.src = el;
    fragment.appendChild(cardEl);
  });
  cardBlock.appendChild(fragment);
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

  var cardTemplate = document.querySelector('#card').content;
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = arr.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = generateObjectValue(MOCK_TYPE, VALUE_MOCK_TYPE, [arr.offer.type]);
  cardElement.querySelector('.popup__description').textContent = arr.offer.description;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
  cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнат(ы) для ' + arr.offer.guests + ' гостей';
  cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
  generateSrcPhoto(arr.offer.photos, '.popup__photo', cardElement, '.popup__photos');
  generateFeature(arr.offer.features, cardElement, '.popup__feature');
  return cardElement;
}

fragment.appendChild(makeCardElement(resultGen[0]));

var mapCard = document.querySelector('.map');
var mapCardBefore = document.querySelector('.map__filters-container');

mapCard.insertBefore(fragment, mapCardBefore);
