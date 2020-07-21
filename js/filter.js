'use strict';

(function filter() {
  var PRICEMAX = 50000;
  var PRICEMIN = 10000;

  var formElement = document.querySelector('.map__filters-container');
  var typeElements = formElement.querySelectorAll('select');
  var arrTypeHouse = [];
  var arrFilterPrice = [];
  var arrTypeRooms = [];
  var arrTypeGuests = [];

  function filterTypeHouse() {
    var typeHouseElement = document.querySelector('#housing-type');
    var typeHouse = typeHouseElement.value;
    if (typeHouse !== 'any') {
      arrTypeHouse = window.randomResultXHR.filter(function (it) {
        return it.offer.type === typeHouse;
      });
    } else {
      arrTypeHouse = window.randomResultXHR;
    }
    return arrTypeHouse;
  }

  function filterTypePrice() {
    var typePriceElement = document.querySelector('#housing-price');
    var typePriceRange = typePriceElement.value;
    var arr = window.randomResultXHR;

    switch (typePriceRange) {
      case 'low':
        arrFilterPrice = arr.filter(function (it) {
          return it.offer.price < PRICEMIN;
        });
        break;
      case 'high':
        arrFilterPrice = arr.filter(function (it) {
          return it.offer.price > PRICEMAX;
        });
        break;
      case 'any':
        arrFilterPrice = window.randomResultXHR;
        break;
      default:
        arrFilterPrice = arr.filter(function (it) {
          return (it.offer.price >= PRICEMIN) && (it.offer.price <= PRICEMAX);
        });
        break;
    }
    return arrFilterPrice;
  }


  function filterTypeRooms() {

    var typeRoomsElement = document.querySelector('#housing-rooms');
    var typeRooms = typeRoomsElement.value;
    if (typeRooms !== 'any') {
      arrTypeRooms = window.randomResultXHR.filter(function (it) {
        return it.offer.rooms === +typeRooms;
      });
    } else {
      arrTypeRooms = window.randomResultXHR;
    }
    return arrTypeRooms;
  }


  function filterTypeGuests() {

    var typeGuestsElement = document.querySelector('#housing-guests');
    var typeGuests = typeGuestsElement.value;
    if (typeGuests !== 'any') {
      arrTypeGuests = window.randomResultXHR.filter(function (it) {
        return it.offer.guests === +typeGuests;
      });
    } else {
      arrTypeGuests = window.randomResultXHR;
    }
    return arrTypeGuests;
  }

  function compareType(arr1, arr2) {
    var arr = [];
    arr1.forEach(function (element) {
      if (arr2.indexOf(element) !== -1) {
        arr.push(element);
      }
    });

    return arr;
  }

  var featureElements = document.querySelectorAll('.map__features input');

  window.featurePinArr = [];
  featureElements.forEach(function (el) {
    el.addEventListener('click', checkFilter);
  });


  function checkFilter() {
    window.featurePinArr = [];
    featureElements.forEach(function (elem, index) {
      if (featureElements[index].checked) {
        window.featurePinArr.push(elem.value);
      }
    });
    return window.featurePinArr;
  }

  function commonFilter() {
    filterTypeHouse();
    filterTypePrice();
    filterTypeRooms();
    filterTypeGuests();
    var arr1 = compareType(arrTypeHouse, arrFilterPrice);
    var arr2 = compareType(arrTypeRooms, arrTypeGuests);
    var resultCompareType = compareType(arr1, arr2);
    var arrPins = [];
    if (window.featurePinArr.length !== 0) {
      resultCompareType.forEach(function (element) {
        if (element.offer.features.includes(window.featurePinArr[0])) {
          arrPins.push(element);
        }
      });

      if (window.featurePinArr.length > 1) {
        for (var i = 1; i < window.featurePinArr.length; i++) {

          arrPins.forEach(function (element, index) {
            if (element.offer.features.includes(window.featurePinArr[i]) === false) {
              arrPins.splice(index, 1);
            }
          });
        }
      }
    } else {
      arrPins = resultCompareType;
    }

    window.debounce(window.pin.render(arrPins));
  }

  typeElements.forEach(function (el) {
    el.addEventListener('input', commonFilter);
  });
  featureElements.forEach(function (el) {
    el.addEventListener('input', commonFilter);
  });
})();
