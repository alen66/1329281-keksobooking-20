'use strict';

(function filter() {
  var PRICEMAX = 50000;
  var PRICEMIN = 10000;

  var formElement = document.querySelector('.map__filters-container');
  var typeElements = formElement.querySelectorAll('select');
  var arrTypeHouses = [];
  var arrFilterPrices = [];
  var arrTypeRooms = [];
  var arrTypeGuests = [];

  function applayFilterTypeHouse() {
    var typeHouseElement = document.querySelector('#housing-type');
    var typeHouse = typeHouseElement.value;
    if (typeHouse !== 'any') {
      arrTypeHouses = window.randomResultXHR.filter(function (it) {
        return it.offer.type === typeHouse;
      });
    } else {
      arrTypeHouses = window.randomResultXHR;
    }
    return arrTypeHouses;
  }

  function applayFilterTypePrice() {
    var typePriceElement = document.querySelector('#housing-price');
    var typePriceRange = typePriceElement.value;
    var arr = window.randomResultXHR;

    switch (typePriceRange) {
      case 'low':
        arrFilterPrices = arr.filter(function (it) {
          return it.offer.price < PRICEMIN;
        });
        break;
      case 'high':
        arrFilterPrices = arr.filter(function (it) {
          return it.offer.price > PRICEMAX;
        });
        break;
      case 'any':
        arrFilterPrices = window.randomResultXHR;
        break;
      default:
        arrFilterPrices = arr.filter(function (it) {
          return (it.offer.price >= PRICEMIN) && (it.offer.price <= PRICEMAX);
        });
        break;
    }
    return arrFilterPrices;
  }


  function applayFilterTypeRooms() {

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


  function applayFilterTypeGuests() {

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

  function joinFilter() {
    applayFilterTypeHouse();
    applayFilterTypePrice();
    applayFilterTypeRooms();
    applayFilterTypeGuests();
    var arr1 = compareType(arrTypeHouses, arrFilterPrices);
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

    window.debounce.debounce(window.pin.render(arrPins));
  }

  typeElements.forEach(function (el) {
    el.addEventListener('input', joinFilter);
  });
  featureElements.forEach(function (el) {
    el.addEventListener('input', joinFilter);
  });

})();
