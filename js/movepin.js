'use strict';

(function movepin() {
  var LIMITS_MAIN_PIN = {
    top: 130,
    bottom: 600,
    width: 32
  };

  var pin = window.main.mapPinMainElement;
  var blockPin = document.querySelector('.map__overlay');
  var isDrag = false;


  var limits = {
    top: LIMITS_MAIN_PIN.top,
    right: blockPin.offsetWidth - LIMITS_MAIN_PIN.width,
    bottom: LIMITS_MAIN_PIN.bottom,
    left: blockPin.offsetLeft - LIMITS_MAIN_PIN.width
  };

  pin.onmousedown = function () {
    isDrag = true;
  };
  document.onmouseup = function () {
    isDrag = false;
  };
  document.onmousemove = function (e) {
    if (isDrag) {
      move(e);
    }
  };

  function move(e) {
    var newLocation = {
      x: pin.offsetLeft,
      y: pin.offsetTop
    };

    if (e.clientX > limits.right) {
      newLocation.x = limits.right;
    } else if (e.clientX > limits.left) {
      newLocation.x = e.clientX;
    }

    if (e.clientY > limits.bottom) {
      newLocation.y = limits.bottom;
    } else if (e.clientY > limits.top) {
      newLocation.y = e.clientY;
    }
    relocate(newLocation);
  }

  function relocate(newLocation) {
    pin.style.left = newLocation.x + 'px';
    pin.style.top = newLocation.y + 'px';
    window.form.addPinAdress();
  }

})();


