'use stict'
var buttonSend,
  username,
  password,
  message;

document.addEventListener("DOMContentLoaded", ready);
document.onkeyup = function (e) {
	e = e || window.event;
	if (e.keyCode === 13) {
	 buttonSend.click();
	}
	return false;
}

function ready() {
  buttonSend = document.getElementById('sendBut');
  username = document.getElementById('username');
  password = document.getElementById('password');
  message = document.getElementById('message');
  console.log(buttonSend);
  buttonSend.addEventListener("click", function(){login('/login').then(response => setTimeout(function() {
     console.log('there');
     window.location.replace("/");
   } /*2000*/)).catch(error => message.innerHTML = 'Неправильный логин или пароль')});
}

function login(url) {
  console.log(username);
  console.log(password);
  var body =
    'username=' + encodeURIComponent(username.value) +
    '&password=' + encodeURIComponent(password.value);
  console.log(body);
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
}
