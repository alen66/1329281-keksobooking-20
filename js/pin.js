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

  var sameresultXHR = [];

  function filter(arr) {

    var randomResult = shuffle(arr);
    sameresultXHR = randomResult.filter(function (it, index) {
      return index < 5;
    });
    return sameresultXHR;
  }

  function render(result) {
    var ifCardOpen = document.querySelector('.map__card');
    if (ifCardOpen) {
      document.querySelector('.map__card').remove();
    }
    var res = filter(result);
    var pinElements = document.querySelectorAll('.map__pin');
    if (pinElements) {
      pinElements.forEach(function (element, index) {
        if (index !== 0) {
          element.remove();
        }
      });
    }

    res.forEach(function (element, index) {
      fragment.appendChild(makeElement(element, index));
    });

    mapElement.appendChild(fragment);
    window.pin = {
      resultXHR: resultXHR,
      render: render,
      res: res
    };
    window.card.findPinElements();
  }


  var resultXHR = [];
  function successHandler(author) {
    author.forEach(function (el, index) {
      resultXHR[index] = author[index];
    });
    return render(resultXHR);
  }


  function shuffle(arr) {
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
