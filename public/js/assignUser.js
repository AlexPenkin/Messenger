'use strict'
let users = document.getElementsByClassName('users');
let allU = document.getElementById('allU');
let but = document.getElementById('but');
let user = USER;


function addClass(elem) {
  elem.className = 'users active'
};

function removeClass(elem) {
  elem.className = 'users'
};

function assignUser(user, url) {
  let activeUsers = document.getElementsByClassName('active');
  let json = {user: user};
  for (let i = 0; i < activeUsers.length; i++) {
    json['user' + i] = activeUsers[i].innerHTML;
  }
  console.log(json);
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.send(JSON.stringify(json));
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
  })
}

allU.addEventListener('click', function() {
  for (let i = 0; i < users.length; i++) {
    users[i].className = 'users active';
  }
})
but.addEventListener('click', function() {
  assignUser(user, '/assignUser').then(res => console.log(res))
})

for (let i = 0; i < users.length; i++) {
  users[i].addEventListener('click', function() {
    if (users[i].className == 'users active') {
      removeClass(users[i])
    } else {
      addClass(users[i]);
    }

  });
}
