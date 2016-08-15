'use strict'
var privateMessage = io('/privateMessage');
var input = document.getElementById('chatInput');
var send = document.getElementById('chatSend');
var userMessages = document.getElementById('chatUserMessages');
console.log('CHATNAME: ' + chatName);

privateMessage.on('connect', function() {
   privateMessage.emit('room');
});
privateMessage.on('data', function(data) {
  console.log(data);
  privateMessage.emit('my other event', {
    my: 'data'
  });
});
privateMessage.on('init', function(data) {
Id = data;
console.log(Id);
});

send.addEventListener("click", function(event) {
  if (input.value != '') {
    privateMessage.emit('sendOnServer', {
      message: input.value,
      user: USER
    });
  } else {
    alert("Пустое поле");
  }
});

privateMessage.on('serverRes', function(data) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = data;
  userMessages.appendChild(newMessage);
  input.value = '';
});
