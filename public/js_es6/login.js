'use strict';

try {
  var buttonSend, username, password, message;

  (function () {
    var addMultipleListeners = function addMultipleListeners(element, events, handler, useCapture, args) {
      if (!(events instanceof Array)) {
        throw 'addMultipleListeners: ' + 'please supply an array of eventstrings ' + '(like ["click","mouseover"])';
      }
      //create a wrapper for to be able to use additional arguments
      var handlerFn = function handlerFn(e) {
        handler.apply(this, args && args instanceof Array ? args : []);
      };
      for (var i = 0; i < events.length; i += 1) {
        element.addEventListener(events[i], handlerFn, useCapture);
        console.log(events[i]);
      }
    };

    var handler = function handler(e) {      
      login('/login').then(function (response) {
        return setTimeout(function () {

          window.location.replace("/");
        } /*2000*/);
      }).catch(function (error) {
        return message.innerHTML = 'Неправильный логин или пароль';
      });
    };

    /*buttonSend.addEventListener("click", function() {
      login('/login').then(response => setTimeout(function() {
        console.log('there');
        window.location.replace("/");
      }*/ /*2000*/ /*)).catch(error => message.innerHTML = 'Неправильный логин или пароль')
                   });
                   buttonSend.addEventListener("touchstart", function() {
                   login('/login').then(response => setTimeout(function() {
                   console.log('there');
                   window.location.replace("/");
                   } */ /*2000*/ /*)).catch(error => message.innerHTML = 'Неправильный логин или пароль')
                                 });*/
    //}


    var login = function login(url) {
      console.log(username);
      console.log(password);
      var body = 'username=' + encodeURIComponent(username.value) + '&password=' + encodeURIComponent(password.value);
      console.log(body);
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
    };


    //document.addEventListener("DOMContentLoaded", ready);
    document.onkeyup = function (e) {
      e = e || window.event;
      if (e.keyCode === 13) {
        buttonSend.click();
      }
      return false;
    };

    ;

    // usage


    //function ready() {
    buttonSend = document.getElementById('sendBut');
    username = document.getElementById('username');
    password = document.getElementById('password');
    message = document.getElementById('message');
    console.log(buttonSend);

    addMultipleListeners(buttonSend, ['touchstart', 'click'], handler, false);
  })();
} catch (e) {
  alert(e);
}
