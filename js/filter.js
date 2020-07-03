'use strict';

(function filter() {
  var typeHouseElement = document.querySelector('#housing-type');
  var typeHouse = typeHouseElement.value;


  function onSelectInput(el, funcEl) {
    el.addEventListener('input', funcEl);
  }

  function filterTypeHouse() {

    typeHouse = typeHouseElement.value;
    var arr = window.pin.resultXHR;

    var arrTypeHouse = arr.filter(function (it) {
      return it.offer.type === typeHouse;
    });

    if (typeHouse !== 'any') {
      window.pin.render(arrTypeHouse);
    } else {
      window.pin.render(arr);
    }
  }

  onSelectInput(typeHouseElement, filterTypeHouse);

  window.filter = {
    filterTypeHouse: filterTypeHouse
  };

})();
