'use strict'
const app = require('../app.js');
var users = [];
var user;

function contain(arr, item){
  for (var i = 0 ; i < arr.length; i++) {
    if (arr[i] == item) return true;
  }
}

app.io.on('connection', function(socket) {
  socket.emit('connect');

  socket.on('connectUser', function(data) {
    if(!contain(users, data.user)) users.push(data.user);

    socket.broadcast.emit('onlineUsers', {
      users: users,
      quanity: users.length,
    });
    socket.emit('onlineUsers', {
      users: users,
      quanity: users.length,
    });
    socket.broadcast.emit('connectedUsers', {
      user: data.user
    });
    user = data.user;

  });

  socket.on('sendOnServer', function(data) {

    socket.emit('successfulMessage', data);
    socket.broadcast.emit('successfulMessage', data);
  });

  socket.on('disconnect', function() {

    for (var i = 0; i < users.length; i++) {
      if (user == users[i]) {
        users.splice(i, 1);
        break;
      }
    }

    socket.emit('onlineUsers', {
      users: users,
      quanity: users.length,
    });
    socket.broadcast.emit('onlineUsers', {
      users: users,
      quanity: users.length,
    });
    socket.broadcast.emit('disconnectedUsers', {
      users: users,
      quanity: users.length,
      user: user
    });

  });


});
 
