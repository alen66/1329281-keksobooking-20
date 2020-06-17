'use strict';

(function data() {
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

  window.data = {
    resultGen: resultGen,
    X: X,
    Y: Y
  };

})();
