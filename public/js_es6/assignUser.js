'use strict'
let users = document.getElementsByClassName('users');
let allU = document.getElementById('allU');
let unassigned = document.getElementById('unassigned');
let assigned = document.getElementById('assigned');
let user = USER;
let unassignedUsers = unassigned.getElementsByTagName('LI');
let aUL = document.getElementById('aUL');
let uUL = document.getElementById('uUL');
console.log(unassignedUsers);

function assignUser(user, addUser, url) {
  let json = {
    user: user
  };
  json['addUser'] = addUser;
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

function moveUser(target, elem) {
  target.style = 'display: none;'
  let node = document.createElement("LI");
  let textnode = document.createTextNode(target.innerHTML);
  node.appendChild(textnode);
  elem.appendChild(node);
}

function addListener(target, url, whereToMove){
  target.addEventListener('click', function(e) {
    if (e.target.tagName == "LI") {
      assignUser(user, e.target.innerHTML, url).then(res => {
        let status = JSON.parse(res)
        if (status.status == 'success') {
          moveUser(e.target, whereToMove);
        }
      });
    }
  })
}

addListener(unassigned, '/assignUser', aUL);
addListener(assigned, '/unassignUser', uUL);
