'use strict'
var userItemAdm = document.getElementsByClassName('userItemAdm');
var buttonDefineUser = document.getElementsByClassName('defineUser');
var message = document.getElementsByClassName('message');
var username = document.getElementsByClassName('username');
var role = document.getElementsByClassName('roleSelect');
for (let i = 0; i < buttonDefineUser.length; i++) {
  buttonDefineUser[i].addEventListener('click', function() {
    console.log(role[i]);
    defineUser('/defineUser', username[i], role[i])
      .then(res => {
        message[i].innerHTML = res;
        if (res == 'Выберите роль') {
          throw ('Выберите роль')
        }
      })
      .then(res => {
        setTimeout(function() {
          userItemAdm[i].className = "userItemAdm faded"
        }, 1000)
      })
      .then(res => {
        console.log(2);
        setTimeout(function() {
          userItemAdm[i].className = "userItemAdm fadedDone";
        }, 2000)

      })
      .catch(err => console.log(err))
  })
}
/*for (let i = 0; i < userItemAdm.length; i++){
  userItemAdm[i].addEventListener('click', function (event) {
    if (event.target == buttonDefineUser[i]) {
      message[i].innerHTML = 'worked';
      event.stopPropagation();
    } else {
      event.stopPropagation();
    }

  })

}
*/

function defineUser(url, user, role) {
  var body =
    'username=' + encodeURIComponent(user.innerHTML) +
    '&role=' + encodeURIComponent(role.value);
  console.log(body);
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
