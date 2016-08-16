var socket = io();
var input = document.getElementById('chatInput');
var send = document.getElementById('chatSend');
var userMessages = document.getElementById('chatUserMessages');
var online = document.getElementById('onlineUsers');



send.addEventListener("click", function(event) {
  if (input.value != '') {
    socket.emit('sendOnServer', {
      message: input.value,
      user: user
    });
  } else {
    alert("Пустое поле");
  }
});

socket.on('connect', function(data) {
  socket.emit('connectUser', {
    user: user
  });
});

socket.on('connectedUsers', function(data) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = data.user + " подключился!";
  userMessages.appendChild(newMessage);
});

socket.on('disconnectedUsers', function(data) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = data.user + " отключился!";
  userMessages.appendChild(newMessage);
});

socket.on('onlineUsers', function(data) {
  online.innerHTML = "Пользователей онлайн: " + data.quanity;
});

socket.on('successfulMessage', function(data) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = data.user + ": " + data.message;
  userMessages.appendChild(newMessage);
  input.value = '';
});
