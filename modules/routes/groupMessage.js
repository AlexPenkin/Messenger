'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
var groupInfo = {};
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
