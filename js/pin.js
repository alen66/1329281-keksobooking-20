'use strict';

(function pin() {
  var mapElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  function makeElement(arr, i) {

    var pinTemplateElement = document.querySelector('#pin').content;
    var pinButtonElement = pinTemplateElement.querySelector('.map__pin');
    var pinElement = pinButtonElement.cloneNode(true);
    pinElement.querySelector('img').src = arr.author.avatar;
    pinElement.querySelector('img').alt = arr.offer.title;
    pinElement.querySelector('img').setAttribute('data-index', i);
    pinElement.style = 'left:' + (arr.location.x + window.data.X) + 'px; top: ' + (arr.location.y + window.data.Y) + 'px;';
    return pinElement;
  }

  var resultXHR = {};
  function successHandler(author) {
    author.forEach(function (el, index) {
      fragment.appendChild(makeElement(el, index));
      resultXHR[index] = author [index];
    });
    mapElement.appendChild(fragment);
    window.card.findPinElements();
  }


  window.backend.load(successHandler, window.backend.errorHandler);

  window.pin = {
    resultXHR: resultXHR
  };

})();
