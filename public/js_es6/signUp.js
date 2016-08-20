'use stict'
var buttonSend,
  username,
  password,
  email,
  message;

  document.onkeyup = function (e) {
  	e = e || window.event;
  	if (e.keyCode === 13) {
  	 buttonSend.click();
  	}
  	return false;
  }

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  buttonSend = document.getElementById('sendBut');
  username = document.getElementById('username');
  password = document.getElementById('password');
  email = document.getElementById('email');
  message = document.getElementById('message');
  buttonSend.addEventListener("click", function() {
    signUp('/signUp').then(res => {
      message.innerHTML = res;
      setTimeout(function() {
        window.location.replace("/");
      }, 2000)
    }).catch(err => {
      message.innerHTML = 'Ошибка сохранения в базу данных';
    })
  })
  buttonSend.addEventListener("touchstart", function() {
    signUp('/signUp').then(res => {
      message.innerHTML = res;
      setTimeout(function() {
        window.location.replace("/");
      }, 2000)
    }).catch(err => {
      message.innerHTML = 'Ошибка сохранения в базу данных';
    })
  })
}

function signUp(url) {
  var body =
    'username=' + encodeURIComponent(username.value) +
    '&password=' + encodeURIComponent(password.value) +
    '&email=' + encodeURIComponent(email.value);
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(body);
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };
    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };
  });
}
