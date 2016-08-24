'use strict';
'use strcit';

var groupMessage = io('/groupMessage');

var input = document.getElementById('chatInput');
var send = document.getElementById('chatSend');
var userMessages = document.getElementById('chatUserMessages');
userMessages.scrollTop = userMessages.scrollHeight;
document.onkeyup = function (e) {
  e = e || window.event;
  if (e.keyCode === 13) {
    send.click();
  }
  return false;
};

send.addEventListener("click", function (event) {
  if (input.value != '') {
    groupMessage.emit('sendOnServer', {
      message: input.value,
      user: USER
    });
  } else {
    alert("Пустое поле");
  }
});

groupMessage.on('serverRes', function (data) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = data;
  userMessages.appendChild(newMessage);
  input.value = '';
  userMessages.scrollTop = userMessages.scrollHeight;
});