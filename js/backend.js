'use strict';

(function backend() {
  var API_URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 5000;

  function closePopupError(errorDivElement) {
    errorDivElement.removeEventListener('click', function () {
      closePopupError(errorDivElement);
    });

    document.onkeydown = null;
    errorDivElement.remove();
  }

  function errorHandler() {

    var errorTemplateElement = document.querySelector('#error').content;
    var errorElement = errorTemplateElement.querySelector('.error');
    var errorDivElement = errorElement.cloneNode(true);
    errorDivElement.style = 'z-index: 9';
    window.main.adFormElement.appendChild(errorDivElement);

    errorDivElement.addEventListener('click', function () {
      closePopupError(errorDivElement);
    });

    document.onkeydown = logKey;

    function logKey(e) {
      if (e.keyCode === 27 || e.keyCode === 13) {
        closePopupError(errorDivElement);
      }
    }
    return errorDivElement;
  }

  function prepareXHR(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      return xhr.response;
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  }

  function save(data, onLoad, onError) {
    var xhr = prepareXHR(onLoad, onError);
    xhr.open('POST', API_URL);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    var xhr = prepareXHR(onLoad, onError);

    xhr.open('GET', API_URL + '/data');
    xhr.send();
  }

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler
  };
})();
