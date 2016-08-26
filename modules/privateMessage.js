'use strict'
const app = require('../app.js');
var pm = require('./routes/chat.js');
const User = require(__dirname + '/schemaes/User.js');
var privateMessage = app.io.of('/privateMessage');
var users = {};
var sockets = {};


privateMessage.on('connection', function(socket) {
  sockets[socket.id] = {
    PMID: pm.PMID,
    sender: pm.sender,
    recipient: pm.recipient
  };
  socket.join(sockets[socket.id].PMID + '');
  socket.on('sendOnServer', function(data) {

    updateUsersWithChat(sockets[socket.id].sender, sockets[socket.id].recipient, sockets[socket.id].PMID, data.message)
      .then(resp => console.log(resp + "dasdasd"))
      .then(privateMessage.to(sockets[socket.id].PMID + '').emit('serverRes', `${sockets[socket.id].sender} : ${data.message}`))
      .catch(err => console.log(err));
    app.notificationEmitter.emit(
      'messageNotification',
      `${sockets[socket.id].sender}`,
      `${data.message}`,
      [sockets[socket.id].recipient]
    );
  });
})

privateMessage.on('disconnect', function(socket) {

  sockets.splice(sockets.indexOf(socket.id), 1);

  console.log('disconnect');
});

function updateUsersWithChat(sender, recipient, pmid, message) {
  return new Promise((resolve, reject) => {
    User.update({
      conversations: {
        $elemMatch: {
          PMID: pmid
        }
      }
    }, {
      $push: {
        'conversations.$.messages': {
          name: sender,
          message: message,
          date: Date.now(),
          readed: true
        }
      }
    }, {
      multi: true
    }, function(err, num) {
      if (err) {
        reject(new Error(err))
      }
      resolve(num);
    })
  })
}
