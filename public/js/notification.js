'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var notification = document.getElementById('notification');
var source = new EventSource('/notification');

Array.prototype.contains = function (elem) {
  for (var i in this) {
    if (this[i] == elem) return true;
  }
  return false;
};

if (isNaN(sessionStorage.getItem('quanity'))) {
  sessionStorage.setItem('quanity', 0);
}

var Notification = function () {
  function Notification() {
    _classCallCheck(this, Notification);

    this.quanity = sessionStorage.getItem('quanity') || 0;
    this.notificator = document.createElement('div');
    this.notificator.id = 'notification';
    this.audio = new Audio('/notification.wav');
    this.header = document.getElementById('header');
    this.header.appendChild(this.notificator);
    var self = this;
    this.notificator.addEventListener('click', function () {
      self.hideNotification.call(self);
    });
  }

  _createClass(Notification, [{
    key: 'showNotification',
    value: function showNotification() {
      if (this.quanity == 0) {
        this.notificator.innerHTML = '';
        this.notificator.style.display = 'none';
      } else {
        this.notificator.innerHTML = this.quanity;
        this.notificator.style.display = "flex";
      }
    }
  }, {
    key: 'hideNotification',
    value: function hideNotification() {
      this.quanity = 0;
      this.notificator.style.display = 'none';
      sessionStorage.setItem('quanity', this.quanity);
    }
  }, {
    key: 'makeSound',
    value: function makeSound() {
      this.audio.play();
    }
  }, {
    key: 'stopSound',
    value: function stopSound() {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }]);

  return Notification;
}();

var not = new Notification();
not.showNotification();
sessionStorage.setItem('quanity', not.quanity);
source.addEventListener('message', function (e) {
  var jso = JSON.stringify(e.data);
  encodeURIComponent(jso);
  var data = JSON.parse(jso);
  var data1 = JSON.parse(data);

  if (data1.parts.contains(USER)) {
    console.log(data1.sender + ' отправил вам сообщение: ' + data1.msg);
    not.quanity++;
    not.stopSound();
    not.makeSound();
    not.showNotification();
    sessionStorage.setItem('quanity', not.quanity);
  }
}, false);

source.addEventListener('open', function (e) {
  console.log("Connection was opened");
}, false);

source.addEventListener('error', function (e) {
  if (e.readyState == EventSource.CLOSED) {
    console.log("Connection was closed");
  }
}, false);