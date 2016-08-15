'use strict'
const app = require('../app.js');
var pm = require('./routes/chat.js');
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

  privateMessage.to(sockets[socket.id].PMID + '').emit('data', 'work!!!');
  privateMessage.emit('data', 'work!!!' + pm.PMID);

  socket.on('sendOnServer', function(data) {
    console.log("ASDASD");
    updateUsersWithChat(sockets[socket.id].sender, sockets[socket.id].recipient, sockets[socket.id].PMID, data.message)
    .then(resp => console.log(resp + "dasdasd"))
    .then(privateMessage.to(sockets[socket.id].PMID + '').emit('serverRes', `${sockets[socket.id].sender} : ${data.message}  ${sockets[socket.id].PMID} `))

  });

  console.log("PMID" + sockets[socket.id]);
})


function updateUsersWithChat(sender, recipient, pmid, message) {
  return new Promise((resolve, reject) => {
    User..updateMany({
      "conversations.$.PMID": pmid
    }, {
      $push: {
        messages: {
          name: sender,
          message: message,
          date: Date.now(),
          readed: true
        }
      }
    }, function(err, num) {
      if (err) {
        console.log(err);
        reject(new Error(err))
      }
      resolve(num);
    })
  })
}
