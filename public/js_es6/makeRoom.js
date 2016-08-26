'use strict';

var makeBut = document.getElementById('makeRoom');
var contacts = document.getElementById('contacts');
var contactsArr = contacts.getElementsByClassName('userRoom');
var master = document.getElementById('adm');
var nameRoom = document.getElementById('nameRoom');

var addMultipleListeners = function addMultipleListeners(element, events, handler, useCapture, args) {
  if (!(events instanceof Array)) {
    throw 'addMultipleListeners: ' + 'please supply an array of eventstrings ' + '(like ["click","mouseover"])';
  }
  //create a wrapper for to be able to use additional arguments
  var handlerFn = function handlerFn(e) {
    handler.apply(this, [e]);
  };
  //
  for (var i = 0; i < events.length; i += 1) {
    element.addEventListener(events[i], handlerFn, useCapture);
    console.log(events[i]);
  }
}
function addUser(event) {
  if (event.currentTarget != event.target) {
    if (event.target.className == 'userRoom active') {
      event.target.className = 'userRoom'
    } else {
      event.target.className += ' active';
    }
  }
}


function sendRoom () {
  var body = {
    name: nameRoom.value,
    users: [],
    masters: master.innerHTML
  };
  var actContactsArr = contacts.getElementsByClassName('active');
    body.users.push(master.innerHTML)
  for (var i = 0; i < actContactsArr.length; i++) {
    body.users.push(actContactsArr[i].innerHTML)
  }
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/makeRoom');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
  xhr.onload = function () {

    if (this.status == 200) {
      if (JSON.parse(this.response).status == 'success') {
        console.log('hurray');
      }
    } else {
      var error = new Error(this.statusText);
      error.code = this.status;
      console.log(this.statusText);
    }
  };

  xhr.onerror = function () {
    throw new Error("Network Error");
  };
}


addMultipleListeners(makeBut, ['click', 'touchstart'], sendRoom, false)
addMultipleListeners(contacts, ['click', 'touchstart'], addUser, false)
