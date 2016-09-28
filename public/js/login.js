'use strict';

var buttonSend, username, password, message;

function login(url) {
  var body = 'username=' + encodeURIComponent(username.value) + '&password=' + encodeURIComponent(password.value);
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onload = function () {

      if (this.status == 200) {
        if (JSON.parse(this.response).status == 'success') {
          message.innerHTML = JSON.parse(this.response).message;
          resolve(this.response);
        }
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };
  });
}

function addMultipleListeners(element, events, handler, useCapture, args) {
  if (!(events instanceof Array)) {
    throw 'addMultipleListeners: ' + 'please supply an array of eventstrings ' + '(like ["click","mouseover"])';
  }
  var handlerFn = function handlerFn(e) {
    handler.apply(this, args && args instanceof Array ? args : []);
  };
  for (var i = 0; i < events.length; i += 1) {
    element.addEventListener(events[i], handlerFn, useCapture);
  }
}

function handler(e) {
  login('/login').then(function (response) {
    return setTimeout(function () {
      window.location.replace("/");
    } /*2000*/);
  }).catch(function (error) {
    return message.innerHTML = 'Неправильный логин или пароль';
  });
};

document.onkeyup = function (e) {
  e = e || window.event;
  if (e.keyCode === 13) {
    buttonSend.click();
  }
  return false;
};

document.addEventListener("DOMContentLoaded", function () {
  buttonSend = document.getElementById('sendBut');
  username = document.getElementById('username');
  password = document.getElementById('password');
  message = document.getElementById('message');
  addMultipleListeners(buttonSend, ['touchstart', 'click'], handler, false);

  /*buttonSend.addEventListener("click", function() {
    login('/login').then(response => setTimeout(function() {
      console.log('there');
      window.location.replace("/");
    }*/
  /*2000*/
  /*)).catch(error => message.innerHTML = 'Неправильный логин или пароль')
   });
   buttonSend.addEventListener("touchstart", function() {
     login('/login').then(response => setTimeout(function() {
       console.log('there');
       window.location.replace("/");
     } */
  /*2000*/
  /*)).catch(error => message.innerHTML = 'Неправильный логин или пароль')
   });*/
  //}

});