'use strict';

(function movepin() {
  var LIMITS_MAIN_PIN = {
    top: 93,
    height: 112
  };

  var pin = window.main.mapPinMainElement;
  var blockPin = document.querySelector('.map__overlay');

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      bottom: box.bottom,
      top: box.top,
      left: box.left + pageXOffset
    };
  }


  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    window.sizeMarginLeft = getCoords(blockPin).left;
    window.sizeMarginTop = getCoords(blockPin).top;
    var limitBottom = getCoords(blockPin).bottom;
    var limits = {
      top: LIMITS_MAIN_PIN.top + window.sizeMarginTop,
      right: blockPin.offsetWidth + (pin.offsetWidth / 6) + window.sizeMarginLeft,
      bottom: limitBottom - LIMITS_MAIN_PIN.height,
      left: blockPin.offsetLeft - (pin.offsetWidth / 6) + window.sizeMarginLeft
    };

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var newLocation = {
      x: pin.offsetLeft,
      y: pin.offsetTop
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      newLocation = {
        x: pin.offsetLeft - shift.x,
        y: pin.offsetTop - shift.y
      };

      if (moveEvt.clientX > limits.right) {
        newLocation.x = limits.right;
      } else if (moveEvt.clientX > limits.left) {
        newLocation.x = moveEvt.clientX;
      } else if (moveEvt.clientX < limits.left) {
        newLocation.x = limits.left;
      }

      if (moveEvt.clientY > limits.bottom) {
        newLocation.y = limits.bottom;
      } else if (moveEvt.clientY > limits.top) {
        newLocation.y = moveEvt.clientY;
      } else if (moveEvt.clientY < limits.top) {
        newLocation.y = limits.top;
      }

      relocate(newLocation);
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pin.removeEventListener('click', onClickPreventDefault);
        };
        pin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  function relocate(newLocation) {
    pin.style.left = newLocation.x - (pin.offsetWidth / 2) - window.sizeMarginLeft + 'px';
    pin.style.top = newLocation.y - (pin.offsetWidth / 2) - window.sizeMarginTop + 'px';
    window.form.addPinAdress();
  }

})();
