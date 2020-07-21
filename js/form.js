'use strict';
(function form() {
  var ROOM_NUMBER_MAX = 100;
  var ROOM_NUMBER_MIN = 0;
  var ARR_PRICEHOUSE_MIN = [0, 1000, 5000, 10000];
  var ARR_TYPE_HOUSE = ['bungalo', 'flat', 'house', 'palace'];
  var ARR_TIME = ['12:00', '13:00', '14:00'];


  var pinLocation = {
    x: window.main.mapPinMainElement.offsetLeft,
    y: window.main.mapPinMainElement.offsetTop
  };


  var roomNumberElement = window.main.adFormElement.querySelector('#room_number');
  var capacityElement = window.main.adFormElement.querySelector('#capacity');
  var valueRoomNumberElement = roomNumberElement.value;
  var valueCapacityElement = capacityElement.value;

  function correctCapacity() {
    if (roomNumberElement[0].selected) {
      capacityElement[2].selected = true;
    }
  }

  correctCapacity();

  var addressFormElement = window.main.adFormElement.querySelector('#address');

  var typeHouseElement = window.main.adFormElement.querySelector('#type');
  var priceHouseElement = window.main.adFormElement.querySelector('#price');
  var valueTypeHouseElement = typeHouseElement.value;
  var valuePriceHouseElement = priceHouseElement.value;

  var inTimeElement = window.main.adFormElement.querySelector('#timein');
  var outTimeElement = window.main.adFormElement.querySelector('#timeout');
  var valueInTimeElement = inTimeElement.value;
  var valueOutTimeElement = outTimeElement.value;

  var resetButton = window.main.adFormElement.querySelector('.ad-form__reset');

  function cleanForm() {
    window.main.mapPinMainElement.style.left = pinLocation.x + 'px';
    window.main.mapPinMainElement.style.top = pinLocation.y + 'px';
    adPinAdressNoActive();
    correctCapacity();
  }

  function resetForm() {
    resetButton.removeEventListener('click', resetForm);
    adFormElementNoActive();
  }

  function adFormElementNoActive() {
    resetButton.removeEventListener('click', resetForm);
    resetButton.addEventListener('click', function () {
    });
    resetButton.click();
    resetButton.removeEventListener('click', function () {
    });

    cleanForm();

    document.querySelector('.map').classList.add('map--faded');
    window.main.adFormElement.classList.add('ad-form--disabled');
    var ifCardOpen = document.querySelector('.map__card');

    if (ifCardOpen) {
      document.querySelector('.map__card').remove();
    }

    fieldsetElements.forEach(function (el) {
      el.disabled = true;
    });
    var pinElements = document.querySelectorAll('.map__pin');
    var pinMainElement = document.querySelector('.map__pin--main');
    if (pinElements) {
      pinElements.forEach(function (element) {
        if (element !== pinMainElement) {
          element.remove();
        }
      });
    }
    window.main.mapPinMainElement.addEventListener('mousedown', window.main.onFormOpenClick);
    window.main.mapPinMainElement.addEventListener('keydown', window.main.onFormOpenKey);
    window.main.adFormElement.addEventListener('submit', submitHandler);

    resetButton.addEventListener('click', resetForm);
  }


  function getPinX() {
    var pinX = window.main.mapPinMainElement.offsetLeft + window.data.X / 2;
    return pinX;
  }

  function getPinY() {
    var pinY = window.main.mapPinMainElement.offsetTop + window.data.Y / 2;
    return pinY;
  }


  function adPinAdressNoActive() {
    addressFormElement.value = getPinX() + ', ' + getPinY();
  }

  function adPinAdress() {
    addressFormElement.value = getPinX() + ', ' + (getPinY() + window.data.Y / 2 + window.data.Z);
  }

  window.form = {
    adPinAdress: adPinAdress,
    adPinAdressNoActive: adPinAdressNoActive
  };

  adPinAdressNoActive();

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
    return false;
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


  function validPriceValue() {
    valueTypeHouseElement = typeHouseElement.value;
    valuePriceHouseElement = priceHouseElement.value;

    for (var i = 0; i < ARR_TYPE_HOUSE.length; i++) {
      if (valueTypeHouseElement === ARR_TYPE_HOUSE[i]) {
        priceHouseElement.placeholder = ARR_PRICEHOUSE_MIN[i];
        if (+valuePriceHouseElement < ARR_PRICEHOUSE_MIN[i]) {
          priceHouseElement.setCustomValidity('Введите значение не меньше ' + ARR_PRICEHOUSE_MIN[i] + ' руб.');
        } else {
          priceHouseElement.setCustomValidity('');
        }
      }
    }
  }


  function validInTimeValue() {
    valueInTimeElement = inTimeElement.value;
    for (var i = 0; i < ARR_TIME.length; i++) {
      if (valueInTimeElement === ARR_TIME[i]) {
        outTimeElement.value = ARR_TIME[i];
      }
    }
  }

  function validOutTimeValue() {
    valueOutTimeElement = outTimeElement.value;
    for (var i = 0; i < ARR_TIME.length; i++) {
      if (valueOutTimeElement === ARR_TIME[i]) {
        inTimeElement.value = ARR_TIME[i];
      }
    }
  }

  var avatarInputElement = window.main.adFormElement.querySelector('#avatar');
  var imagesInputElement = window.main.adFormElement.querySelector('#images');


  function validExst(file, textLoad) {
    if (file.type === 'image/jpeg') {
      textLoad.innerHTML = file.name;
      return true;
    } else {
      textLoad.innerHTML = 'Файл неверного формата';
      return false;
    }
  }

  function validLoadAvatar() {
    var file = window.main.adFormElement.elements['avatar'].files[0];
    var textLoad = window.main.adFormElement.querySelector('.ad-form-header__drop-zone');
    validExst(file, textLoad);
  }

  function validLoadImages() {
    var file = window.main.adFormElement.elements['images'].files[0];
    var textLoad = window.main.adFormElement.querySelector('.ad-form__drop-zone');
    validExst(file, textLoad);
  }


  capacityFunc();
  validPriceValue();
  validInTimeValue();
  validOutTimeValue();

  onSelectInput(roomNumberElement, capacityFunc);
  onSelectInput(capacityElement, capacityFunc);
  onSelectInput(typeHouseElement, validPriceValue);
  onSelectInput(priceHouseElement, validPriceValue);
  onSelectInput(inTimeElement, validInTimeValue);
  onSelectInput(outTimeElement, validOutTimeValue);
  onSelectInput(addressFormElement, adPinAdress);
  onSelectInput(avatarInputElement, validLoadAvatar);
  onSelectInput(imagesInputElement, validLoadImages);


  var fieldsetElements = window.main.adFormElement.querySelectorAll('fieldset');

  function closePopupSuccess(successDivElement) {
    successDivElement.removeEventListener('click', function () {
      closePopupSuccess();
    });

    document.onkeydown = null;

    successDivElement.remove();
    adFormElementNoActive();
  }

  function onLoadSuccess() {
    window.main.adFormElement.removeEventListener('submit', submitHandler);
    var successTemplateElement = document.querySelector('#success').content;
    var successElement = successTemplateElement.querySelector('.success');
    var successDivElement = successElement.cloneNode(true);
    successDivElement.style = 'z-index: 9';
    window.main.adFormElement.appendChild(successDivElement);

    successDivElement.addEventListener('click', function () {
      closePopupSuccess(successDivElement);
    });

    document.onkeydown = logKey;

    function logKey(e) {
      if (e.keyCode === 27 || e.keyCode === 13) {
        closePopupSuccess(successDivElement);
      }
    }
    return window.successDivElement;
  }

  function submitHandler(evt) {

    window.backend.save(new FormData(window.main.adFormElement), onLoadSuccess, window.backend.errorHandler);
    evt.preventDefault();

  }

  window.main.adFormElement.addEventListener('submit', submitHandler);
  resetButton.addEventListener('click', resetForm);

})();
