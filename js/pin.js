'use strict';

(function map() {
  var mapElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  function makeElement(arr) {

    var pinTemplateElement = document.querySelector('#pin').content;
    var pinButtonElement = pinTemplateElement.querySelector('.map__pin');
    var pinElement = pinButtonElement.cloneNode(true);

    pinElement.querySelector('img').src = arr.author.avatar;
    pinElement.querySelector('img').alt = arr.offer.title;
    pinElement.style = 'left:' + (arr.location.x + window.data.X) + 'px; top: ' + (arr.location.y + window.data.Y) + 'px;';

    return pinElement;
  }

  window.data.resultGen.forEach(function (el) {
    fragment.appendChild(makeElement(el));
  });

  mapElement.appendChild(fragment);
})();
