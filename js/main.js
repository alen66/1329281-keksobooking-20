'use strict';

(function main() {

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var fieldsetElements = adFormElement.querySelectorAll('fieldset');
  fieldsetElements.forEach(function (el) {
    el.disabled = true;
  });

  function adFormElementActive() {
    document.querySelector('.map').classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    fieldsetElements.forEach(function (el) {
      el.disabled = false;
    });
    window.form.adPinAdress();
    window.backend.load(window.pin.successHandler, window.backend.errorHandler);
    mapPinMainElement.removeEventListener('mousedown', onFormOpenClick);
    mapPinMainElement.removeEventListener('keydown', onFormOpenKey);

  }

  function onFormOpenClick(e) {
    if (e.button === 0) {
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

  window.main = {
    mapPinMainElement: mapPinMainElement,
    adFormElement: adFormElement,
    onFormOpenClick: onFormOpenClick,
    onFormOpenKey: onFormOpenKey
  };

})();
