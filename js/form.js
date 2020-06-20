'use strict';
(function form() {
  var ROOM_NUMBER_MAX = 100;
  var ROOM_NUMBER_MIN = 0;

  var roomNumberElement = window.main.adFormElement.querySelector('#room_number');
  var capacityElement = window.main.adFormElement.querySelector('#capacity');
  var valueRoomNumberElement = roomNumberElement.value;
  var valueCapacityElement = capacityElement.value;

  function adPinAdress() {

    var addressFormElement = window.main.adFormElement.querySelector('#address');
    addressFormElement.value = window.main.mapPinMainElement.offsetLeft + window.data.X / 2 + ', ' + (window.main.mapPinMainElement.offsetTop + window.data.Y);
  }

  adPinAdress();

  function onSelectInput(el, funcEl) {
    el.addEventListener('input', funcEl);
  }

  function validRoomCapacity(roomsCount, guestsCount) {
    if (+roomsCount < ROOM_NUMBER_MAX) {
      if (+roomsCount >= guestsCount) {
        if (+guestsCount > ROOM_NUMBER_MIN) {
          return +guestsCount > ROOM_NUMBER_MIN;
        }
      } else {
        return false;
      }
    } else {
      if (+guestsCount === ROOM_NUMBER_MIN) {
        return +guestsCount === ROOM_NUMBER_MIN;
      }
    }
  }

  function capacityFunc() {
    valueRoomNumberElement = roomNumberElement.value;
    valueCapacityElement = capacityElement.value;

    if (!validRoomCapacity(valueRoomNumberElement, valueCapacityElement)) {
      if (+valueRoomNumberElement < ROOM_NUMBER_MAX) {
        if (+valueCapacityElement === ROOM_NUMBER_MIN) {
          capacityElement.setCustomValidity('Только вариант: 100 комнат');
        } else {
          capacityElement.setCustomValidity('Для гостей в количестве ' + valueCapacityElement + ', комнат не меньше ' + valueCapacityElement);
        }
      } else if (+valueRoomNumberElement === ROOM_NUMBER_MAX) {
        capacityElement.setCustomValidity('Только вариант: не для гостей');
      }
    } else {
      capacityElement.setCustomValidity('');
    }
  }

  capacityFunc();

  onSelectInput(roomNumberElement, capacityFunc);
  onSelectInput(capacityElement, capacityFunc);

})();
