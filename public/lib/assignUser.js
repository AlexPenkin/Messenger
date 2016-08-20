'use strict';

var users = document.getElementsByClassName('users');
var allU = document.getElementById('allU');
var unassigned = document.getElementById('unassigned');
var assigned = document.getElementById('assigned');
var user = USER;
var unassignedUsers = unassigned.getElementsByTagName('LI');
var aUL = document.getElementById('aUL');
var uUL = document.getElementById('uUL');
console.log(unassignedUsers);

function assignUser(user, addUser, url) {
  var json = {
    user: user
  };
  json['addUser'] = addUser;
  console.log(json);
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(json));
    xhr.onload = function () {
      if (this.status == 200) {
        resolve(this.response);
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

function moveUser(target, elem) {
  target.style = 'display: none;';
  var node = document.createElement("LI");
  var textnode = document.createTextNode(target.innerHTML);
  node.appendChild(textnode);
  elem.appendChild(node);
}

function addListener(target, url, whereToMove) {
  target.addEventListener('click', function (e) {
    if (e.target.tagName == "LI") {
      assignUser(user, e.target.innerHTML, url).then(function (res) {
        var status = JSON.parse(res);
        if (status.status == 'success') {
          moveUser(e.target, whereToMove);
        }
      });
    }
  });
}

addListener(unassigned, '/assignUser', aUL);
addListener(assigned, '/unassignUser', uUL);