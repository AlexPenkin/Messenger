'use strict'

var buttonSend,
  username,
  password,
  message;

/*function login(url) {
  var body =
    'pin=' + encodeURIComponent(username.value) +
    '&hash=' + encodeURIComponent(password.value);
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(body);
    xhr.onload = function() {

      if (this.status == 200) {
        if (JSON.parse(this.response).status == 'success') {
          message.innerHTML = JSON.parse(this.response).message;
          resolve(
            this.response
          );
        }

      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject((error));
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
  });
}*/  function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = window.btoa(tok);
  return "Basic " + hash;
}

function login(url) {

  var auth = make_base_auth(username.value,password.value);
  console.log(auth);
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login');
    xml.setRequestHeader('Authorization', auth);
    console.log('asda');
    xhr.send();
    xhr.onload = function() {
      if (this.status == 200) {
        if (JSON.parse(this.response).status == 'success') {
          message.innerHTML = JSON.parse(this.response).message;
          resolve(
            this.response
          );
        }
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject((error));
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
  });
}

function addMultipleListeners(element, events, handler, useCapture, args) {
  if (!(events instanceof Array)) {
    throw 'addMultipleListeners: ' +
      'please supply an array of eventstrings ' +
      '(like ["click","mouseover"])';
  }
  var handlerFn = function(e) {
    handler.apply(this, args && args instanceof Array ? args : []);
  }
  for (var i = 0; i < events.length; i += 1) {
    element.addEventListener(events[i], handlerFn, useCapture);
  }
}

function handler(e) {
  login('/login').then(response => setTimeout(function() {
    window.location.replace("/");
  } /*2000*/ )).catch(error => message.innerHTML = 'Неправильный логин или пароль')
};

document.onkeyup = function(e) {
  e = e || window.event;
  if (e.keyCode === 13) {
    buttonSend.click();
  }
  return false;
}

document.addEventListener("DOMContentLoaded", function() {
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

  function ajaxQueryForm(url, optionsObj, callBack) {
    var xhr = new XMLHttpRequest(),
      keys = Object.keys(optionsObj.body),
      body,
      headType = optionsObj.head ? optionsObj.head[0] : 'Content-Type',
      headVal = optionsObj.head ? optionsObj.head[1] : 'application/x-www-form-urlencoded'
    xhr.open((optionsObj.method || 'GET'), url);
    xhr.setRequestHeader(headType, headVal);
    for (var i = 0; i < keys.length; i++) {
      if (i === 0) {
        body = "" + keys[i] + "=" + "" + encodeURIComponent(optionsObj.body[keys[i]]);
      } else {
        body += "&" + keys[i] + "=" + "" + encodeURIComponent(optionsObj.body[keys[i]]);
      }
    }
    xhr.send(body);
    xhr.onload = function() {
      if (this.status == 200) {
        callBack(this.response);
      } else {
        console.log(this.statusText);
      }
    }
    if optionsObj.loadstart xhr.loadstart = optionsObj.loadstart;
    if optionsObj.loadstart xhr.load = optionsObj.loadSuccessful;
    if optionsObj.loadstart xhr.loadend = optionsObj.loadend;
    xhr.onerror = function(err) {
      console.log(err);
    };
  }

  //Some sort of documentation
  var optionsObj = {
    method: "POST",
    head: ['Content-Type', 'application/x-www-form-urlencoded'],
    body: {
      name: 'Alex',
      lastName: 'Пенкин'
    },
    loadstart: function() {
      console.log('QueryStart!');
    },
    loadSuccessful: function() {
      console.log('Ended Right!');
    },
    loadend: function() {
      console.log('Ended Somehow!');
    }
  };

  ajaxQueryForm('/test', optionsObj, function(res) {
    console.log('done with: ' + res);
  });



});
