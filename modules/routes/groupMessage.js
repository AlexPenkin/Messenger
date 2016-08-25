'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
var groupInfo = {};
var easysse = require("easysse");

Array.prototype.contains = function(elem) {
  for (var i in this) {
    if (this[i] == elem) return true;
  }
  return false;
}
app.app.route("/notification")
.get(function(req, res) {
      app.notificationEmitter.on('messageNotification', function(name, message, participants) {
        console.log('MESSAGE');
        console.log(participants);
        console.log(name);
        let members = participants.splice(participants.indexOf(name), 1)
        console.log(participants);
        if (members.contains(name)) {
          if (!res.headersSent) {
            res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
          })
        }
          res.write("retry: 10000\n");
          res.write("data: " + (name) + "\n\n");
          res.write("data: " + (message) + "\n\n");
        }
      });
    })


    app.app.route('/startRoom/:roomName')
    .get(function(req, res) {
      var params = req.params.roomName;
      var messages;
      console.log('param: ' + req.params.roomName);
      module.exports = groupInfo;

      if (!req.user) {
        res.redirect('/');
      } else {

        User.findOne({
          rooms: {
            $elemMatch: {
              roomName: req.params.roomName
            }
          }
        }, function(err, pers) {
          if (err) {
            console.log(err);
          } else {
            for (var i = 0; i < pers.rooms.length; i++) {
              if (pers.rooms[i].roomName == params) {
                groupInfo.PMIDGr = pers.rooms[i].PMID;
                groupInfo.sender = req.user.username;
                groupInfo.participants = pers.rooms[i].participants;
                messages = pers.rooms[i].messages;
                res.render('groupMessagePage', {
                  user: req.user,
                  roomName: req.param.roomName,
                  messages: messages
                });

              }
            }
          }
        })

        var gc = require(__dirname + '/../sendGroupMessage.js');
        console.log(messages);

      }
    })
    .post(function(req, res) {


    })
