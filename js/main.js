'use strict';

(function main() {

  var mapPinMainElement = document.querySelector('.map__pin--main');
  var adFormElement = document.querySelector('.ad-form');
  var fieldsetElements = adFormElement.querySelectorAll('fieldset');

  var mapFilterElement = document.querySelector('.map__filters');
  var selectMapFiltersElements = mapFilterElement.querySelectorAll('select');
  var fieldsetMapFiltersElements = mapFilterElement.querySelectorAll('fieldset');

  function makeDisableElements(el, flag) {
    el.forEach(function (elem) {
      elem.disabled = flag;
    });
  }

  makeDisableElements(fieldsetElements, true);
  makeDisableElements(selectMapFiltersElements, true);
  makeDisableElements(fieldsetMapFiltersElements, true);


  function addFormElementActive() {
    document.querySelector('.map').classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');

    makeDisableElements(fieldsetElements, false);
    makeDisableElements(selectMapFiltersElements, false);
    makeDisableElements(fieldsetMapFiltersElements, false);


    window.form.addPinAdress();
    window.backend.load(window.pin.successHandler, window.backend.errorHandler);
    mapPinMainElement.removeEventListener('mousedown', onFormOpenClick);
    mapPinMainElement.removeEventListener('keydown', onFormOpenKey);
  }

  function onFormOpenClick(e) {
    if (e.button === 0) {
      addFormElementActive();
    }
  }

  function onFormOpenKey(evt) {
    if (evt.key === 'Enter') {
      addFormElementActive();
    }
  }

  mapPinMainElement.addEventListener('mousedown', onFormOpenClick);
  mapPinMainElement.addEventListener('keydown', onFormOpenKey);

  window.main = {
    mapPinMainElement: mapPinMainElement,
    adFormElement: adFormElement,
    onFormOpenClick: onFormOpenClick,
    onFormOpenKey: onFormOpenKey,
    makeDisableElements: makeDisableElements
  };

})();
