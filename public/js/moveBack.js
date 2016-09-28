'use strict';

var moveBackBut = document.getElementById('moveBack');

if (window.location.pathname == '/') {
  moveBackBut.style.display = 'none';
} else {
  moveBackBut.style.display = 'block';
}

moveBackBut.addEventListener('click', function (ev) {
  window.history.go(-1);
});