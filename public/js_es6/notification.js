'use strict'
var notification = document.getElementById('notification')
var source = new EventSource('/notification?name=' + USER);

Array.prototype.contains = function(elem) {
  for (var i in this) {
    if (this[i] == elem) return true;
  }
  return false;
}

if (isNaN(sessionStorage.getItem('quanity'))) {  
  sessionStorage.setItem('quanity', 0)
}

class Notification {

  constructor() {
    this.quanity = sessionStorage.getItem('quanity') || 0;
    this.notificator = document.createElement('div');
    this.notificator.id = 'notification';
    this.header = document.getElementById('header');
    this.header.appendChild(this.notificator);
    var self = this;
    this.notificator.addEventListener('click', function(){
      self.hideNotification.call(self);
    });
  }

  showNotification() {
    if (this.quanity == 0) {
      this.notificator.innerHTML = '';
      this.notificator.style.display = 'none';
    } else {
      this.notificator.innerHTML = this.quanity;
      this.notificator.style.display = "flex";
    }
  }

  hideNotification() {
    this.quanity = 0;
    this.notificator.style.display = 'none';
    sessionStorage.setItem('quanity', this.quanity);
  }

}
var not = new Notification;
not.showNotification();
sessionStorage.setItem('quanity', not.quanity);
source.addEventListener('message', function(e) {
  var jso = JSON.stringify(e.data)
  encodeURIComponent(jso)
  var data = JSON.parse(jso);
  var data1 = JSON.parse(data);

  if (data1.parts.contains(USER)) {
    console.log(`${data1.sender} отправил вам сообщение: ${data1.msg}`);
    not.quanity++;
    not.showNotification();
    sessionStorage.setItem('quanity', not.quanity);
  }
}, false)

source.addEventListener('open', function(e) {
  console.log("Connection was opened")
}, false)

source.addEventListener('error', function(e) {
  if (e.readyState == EventSource.CLOSED) {
    console.log("Connection was closed")
  }
}, false)
