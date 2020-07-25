'use strict';
(function form() {
  var ROOM_NUMBER_MAX = 100;
  var ROOM_NUMBER_MIN = 0;
  var ARR_MIN_PRICEHOUSES = [0, 1000, 5000, 10000];
  var ARR_TYPE_HOUSES = ['bungalo', 'flat', 'house', 'palace'];
  var ARR_TIMES = ['12:00', '13:00', '14:00'];

  var pinLocation = {
    x: window.main.mapPinMainElement.offsetLeft,
    y: window.main.mapPinMainElement.offsetTop
  };

  var textLoadAvatarElement = window.main.adFormElement.querySelector('.ad-form-header__drop-zone');
  var textFileAvatar = textLoadAvatarElement.innerHTML;
  var textLoadImagesElement = window.main.adFormElement.querySelector('.ad-form__drop-zone');
  var textFileImages = textLoadImagesElement.innerHTML;

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
    window.main.adFormElement.querySelector('.ad-form-header__drop-zone').innerHTML = textFileAvatar;
    window.main.adFormElement.querySelector('.ad-form__drop-zone').innerHTML = textFileImages;
    addPinAdressNoActive();
    correctCapacity();
  }

  function resetForm() {
    resetButton.removeEventListener('click', resetForm);
    addFormElementNoActive();
  }

  function addFormElementNoActive() {
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

    var mapFilterElement = document.querySelector('.map__filters');
    var selectMapFiltersElements = mapFilterElement.querySelectorAll('select');
    var fieldsetMapFiltersElements = mapFilterElement.querySelectorAll('fieldset');


    window.main.makeDisableElements(fieldsetElements, true);
    window.main.makeDisableElements(selectMapFiltersElements, true);
    window.main.makeDisableElements(fieldsetMapFiltersElements, true);

    var featureElements = document.querySelectorAll('.map__features input');

    featureElements.forEach(function (el) {
      el.checked = false;
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


  function addPinAdressNoActive() {
    addressFormElement.value = getPinX() + ', ' + getPinY();
  }

  function addPinAdress() {
    addressFormElement.value = getPinX() + ', ' + (getPinY() - window.data.Y / 2);
  }

  window.form = {
    addPinAdress: addPinAdress,
    addPinAdressNoActive: addPinAdressNoActive
  };

  addPinAdressNoActive();

  function onSelectInput(el, funcEl) {
    el.addEventListener('input', funcEl);
  }


  function validateRoomCapacity(roomsCount, guestsCount) {
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

  function validateCapacity() {
    valueRoomNumberElement = roomNumberElement.value;
    valueCapacityElement = capacityElement.value;

    if (!validateRoomCapacity(valueRoomNumberElement, valueCapacityElement)) {
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


  function validatePriceValue() {
    valueTypeHouseElement = typeHouseElement.value;
    valuePriceHouseElement = priceHouseElement.value;

    for (var i = 0; i < ARR_TYPE_HOUSES.length; i++) {
      if (valueTypeHouseElement === ARR_TYPE_HOUSES[i]) {
        priceHouseElement.placeholder = ARR_MIN_PRICEHOUSES[i];
        if (+valuePriceHouseElement < ARR_MIN_PRICEHOUSES[i]) {
          priceHouseElement.setCustomValidity('Введите значение не меньше ' + ARR_MIN_PRICEHOUSES[i] + ' руб.');
        } else {
          priceHouseElement.setCustomValidity('');
        }
      }
    }
  }


  function validateInTimeValue() {
    valueInTimeElement = inTimeElement.value;
    for (var i = 0; i < ARR_TIMES.length; i++) {
      if (valueInTimeElement === ARR_TIMES[i]) {
        outTimeElement.value = ARR_TIMES[i];
      }
    }
  }

  function validateOutTimeValue() {
    valueOutTimeElement = outTimeElement.value;
    for (var i = 0; i < ARR_TIMES.length; i++) {
      if (valueOutTimeElement === ARR_TIMES[i]) {
        inTimeElement.value = ARR_TIMES[i];
      }
    }
  }

  var avatarInputElement = window.main.adFormElement.querySelector('#avatar');
  var imagesInputElement = window.main.adFormElement.querySelector('#images');


  function validateExst(file, textLoad) {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      textLoad.innerHTML = file.name;
      return;
    }
    textLoad.innerHTML = 'Файл неверного формата';
    return;
  }

  function validateLoadAvatar() {
    var file = window.main.adFormElement.elements['avatar'].files[0];
    var textLoad = textLoadAvatarElement;
    validateExst(file, textLoad);
  }

  function validateLoadImages() {
    var file = window.main.adFormElement.elements['images'].files[0];
    var textLoad = textLoadImagesElement;
    validateExst(file, textLoad);
  }


  validateCapacity();
  validatePriceValue();
  validateInTimeValue();
  validateOutTimeValue();

  onSelectInput(roomNumberElement, validateCapacity);
  onSelectInput(capacityElement, validateCapacity);
  onSelectInput(typeHouseElement, validatePriceValue);
  onSelectInput(priceHouseElement, validatePriceValue);
  onSelectInput(inTimeElement, validateInTimeValue);
  onSelectInput(outTimeElement, validateOutTimeValue);
  onSelectInput(addressFormElement, addPinAdress);
  onSelectInput(avatarInputElement, validateLoadAvatar);
  onSelectInput(imagesInputElement, validateLoadImages);


  var fieldsetElements = window.main.adFormElement.querySelectorAll('fieldset');

  function closePopupSuccess(successDivElement) {
    successDivElement.removeEventListener('click', function () {
      closePopupSuccess();
    });

    document.onkeydown = null;

    successDivElement.remove();
    addFormElementNoActive();
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
