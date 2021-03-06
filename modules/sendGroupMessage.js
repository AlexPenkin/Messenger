'use strict'
const app = require('../app.js');
var groupInfo = require(__dirname + '/routes/groupMessage.js');
const User = require(__dirname + '/schemaes/User.js');
var groupMessage = app.io.of('/groupMessage');
var users = {};
var sockets = {};

groupMessage.on('connection', function(socket) {
  sockets[groupInfo.PMIDGr] = {
    PMID: groupInfo.PMIDGr,
    sockets: [],

  };
  console.log(sockets);
  console.log(groupInfo.sender);
  console.log('id: ' + groupInfo.PMIDGr);
  sockets[groupInfo.PMIDGr].sockets.push(socket.id);
  socket.join(sockets[groupInfo.PMIDGr].PMID + '');
  socket.on('sendOnServer', function(data) {
    console.log('AAAAAAAAAA');
    updateRoomsBd (sockets[groupInfo.PMIDGr].PMID ,data.user, data.message);
    groupMessage.to(sockets[groupInfo.PMIDGr].PMID + '').emit('serverRes', `${data.user} : ${data.message}`);
    //updateRoomsBd (sockets[groupInfo.PMIDGr].PMID ,${data.user}, ${data.message});
    /*updateUsersWithChat(sockets[socket.id].sender, sockets[socket.id].recipient, sockets[socket.id].PMID, data.message)
      .then(resp => console.log(resp + "dasdasd"))
      .then(privateMessage.to(sockets[socket.id].PMID + '').emit('serverRes', `${sockets[socket.id].sender} : ${data.message}`))
      .catch(err => console.log(err));*/
  });
})

groupMessage.on('disconnect', function (socket) {

  sockets[groupInfo.PMIDG].sockets.splice(sockets[groupInfo.PMIDG].sockets.indexOf(socket.id), 1);

    console.log('disconnect');
  });


  function updateRoomsBd (pmid ,sender, message) {
    User.update({
      rooms: {
        $elemMatch: {
          PMID: pmid
        }
      }
    }, {
      $push: {
        'rooms.$.messages': {
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
        throw new Error(err);
      }
      console.log('YEAH!' + num);
    })
  }
