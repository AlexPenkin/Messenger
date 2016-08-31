'use strict';

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = btoa(tok);
  return "Basic " + hash;
}

var buttonSend, username, password, message;

function login(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    try {
      var auth = make_base_auth(username.value, password.value);
    } catch (e) {
      console.log(e);
    }

    try {
      xhr.open('GET', '/basic');
    } catch (e) {
      console.log(e);
    }

    try {
      xhr.setRequestHeader('Authorization', make_base_auth(username.value, password.value));
    } catch (e) {
      console.log(e);
    }

    xhr.send();

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
  login('/basic').then(function (response) {
    return setTimeout(function () {
      window.location.replace("/");
    } /*2000*/);
  }).catch(function (error) {
    return message.innerHTML = error;
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
});