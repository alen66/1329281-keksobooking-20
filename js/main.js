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
// var VALUE_MOCK_TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];//
var ROOM_NUMBER_MAX = 100;
var ROOM_NUMBER_MIN = 0;


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
        'address': adX + ', ' + adY,
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

var mapPinMainElement = document.querySelector('.map__pin--main');
var adFormElement = document.querySelector('.ad-form');
var fieldsetElements = adFormElement.querySelectorAll('fieldset');

fieldsetElements.forEach(function (el) {
  el.disabled = true;
});

function adPinAdress() {
  var addressFormElement = adFormElement.querySelector('#address');
  addressFormElement.value = Number.parseInt(mapPinMainElement.style.left, 10) + X / 2 + ', ' + (Number.parseInt(mapPinMainElement.style.top, 10) + Y);
}

adPinAdress();

function adFormElementActive() {
  document.querySelector('.map').classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');
  fieldsetElements.forEach(function (el) {
    el.disabled = false;
  });
}

function onFormOpenClick(e) {
  switch (e.button) {
    case 0:
      adFormElementActive();
  }
}

function onFormOpenKey(evt) {
  if (evt.key === 'Enter') {
    adFormElementActive();
  }
}

mapPinMainElement.addEventListener('mousedown', onFormOpenClick);
mapPinMainElement.addEventListener('keydown', onFormOpenKey);

var roomNumberElement = adFormElement.querySelector('#room_number');
var capacityElement = adFormElement.querySelector('#capacity');
var valueRoomNumberElement = roomNumberElement.value;
var valueCapacityElement = capacityElement.value;

function onSelectInput(el, funcEl) {
  el.addEventListener('input', funcEl);
}

function capacityFunc() {
  valueRoomNumberElement = roomNumberElement.value;
  valueCapacityElement = capacityElement.value;

  if (!validRoomCapacity(valueRoomNumberElement, valueCapacityElement)) {
    if (valueRoomNumberElement < ROOM_NUMBER_MAX) {
      if (valueCapacityElement <= ROOM_NUMBER_MIN) {
        capacityElement.setCustomValidity('Только вариант: 100 комнат');
      } else {
        capacityElement.setCustomValidity('Для гостей в количестве ' + valueCapacityElement + ', комнат не меньше ' + valueCapacityElement);
      }
    } else if (valueRoomNumberElement >= ROOM_NUMBER_MAX) {
      capacityElement.setCustomValidity('Только вариант: не для гостей');
    }
  } else {
    capacityElement.setCustomValidity('');
  }
}

onSelectInput(roomNumberElement, capacityFunc);
onSelectInput(capacityElement, capacityFunc);

function validRoomCapacity(roomsCount, guestsCount) {
  if (roomsCount < ROOM_NUMBER_MAX) {
    if (roomsCount >= guestsCount) {
      if (guestsCount > ROOM_NUMBER_MIN) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    if (guestsCount <= ROOM_NUMBER_MIN) {
      return true;
    } else {
      return false;
    }
  }
}

capacityFunc();

var mapElement = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

function makeElement(arr) {

  var pinTemplateElement = document.querySelector('#pin').content;
  var pinButtonElement = pinTemplateElement.querySelector('.map__pin');
  var pinElement = pinButtonElement.cloneNode(true);

  pinElement.querySelector('img').src = arr.author.avatar;
  pinElement.querySelector('img').alt = arr.offer.title;
  pinElement.style = 'left:' + (arr.location.x + X) + 'px; top: ' + (arr.location.y + Y) + 'px;';

  return pinElement;
}

resultGen.forEach(function (el) {
  fragment.appendChild(makeElement(el));
});

mapElement.appendChild(fragment);

/*  function generateObjectValue(keys, values, perem) {
  var obj = {};
  for (var i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj[perem];
}*/

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

fragment.appendChild(makeCardElement(resultGen[0]));

var mapCardElement = document.querySelector('.map');
var mapCardBeforeElement = document.querySelector('.map__filters-container');

mapCardElement.insertBefore(fragment, mapCardBeforeElement);

