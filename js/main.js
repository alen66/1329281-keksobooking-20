'use strict';

var NUMBER_OF_ASVERSMENTS = 8;
var MOCK_TITLES = ['домик', 'пентхаус', 'хрущевка', 'Чудесное предложение для молодоженов', 'общага', 'малосемейка', 'коммуналка', 'квартира'];
var MOCK_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MOCK_CHECKIN = ['12:00', '13:00', '14:00'];
var MOCK_CHECKOUT = ['12:00', '13:00', '14:00'];
var MOCK_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MOCK_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var X = 50; /* ширина метки */
var Y = 70; /* высота метки */

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
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
      },
      'offer': {
        'title': generateRandomValueFromArray(MOCK_TITLES),
        'address': '',
        'price': generateRandomNumber(1500, 10000),
        'type': generateRandomValueFromArray(MOCK_TYPE),
        'rooms': generateRandomNumber(1, 6),
        'guests': generateRandomNumber(1, 10),
        'checkin': generateRandomValueFromArray(MOCK_CHECKIN),
        'checkout': generateRandomValueFromArray(MOCK_CHECKOUT),
        'features': generateRandomValueFromArray(MOCK_FEATURES),
        'description': 'Великолепная квартира-студия в центре Токио.',
        'photos': generateArrRandomLength(MOCK_PHOTOS)},
      'location': {
        'x': generateRandomNumber(0, 500),
        'y': generateRandomNumber(130, 630)}
    };
    result.push(ad);
    ad.offer.address = ad.location.x + ',' + ad.location.y;
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
