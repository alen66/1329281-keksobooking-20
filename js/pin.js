'use strict';

(function pin() {
  var MAX_NUMBER_PIN = 10;
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

  var sameresultXHR = [];

  function filter(arr) {

    sameresultXHR = arr.slice(0, MAX_NUMBER_PIN);

    return sameresultXHR;
  }

  function render(result) {
    var ifCardOpenElement = document.querySelector('.map__card');
    if (ifCardOpenElement) {
      document.querySelector('.map__card').remove();
    }
    var resultFilterNumber = filter(result);
    var pinElements = document.querySelectorAll('.map__pin');
    var pinMainElement = document.querySelector('.map__pin--main');
    if (pinElements) {
      pinElements.forEach(function (element) {
        if (element !== pinMainElement) {
          element.remove();
        }
      });
    }

    resultFilterNumber.forEach(function (element, index) {
      fragment.appendChild(makeElement(element, index));
    });

    mapElement.appendChild(fragment);
    window.pin = {
      randomResultXHR: randomResultXHR,
      render: render,
      resultFilterNumber: resultFilterNumber

    };
    window.card.findPinElements();
  }

  var randomResultXHR = [];

  function successHandler(author) {
    var resultXHR = [];
    author.forEach(function (el, index) {
      resultXHR[index] = author[index];
    });
    randomResultXHR = shuffle(resultXHR);

    return render(randomResultXHR);
  }


  function shuffle(arr) { /* перемешивание массива */
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  window.backend.load(successHandler, window.backend.errorHandler);

})();
