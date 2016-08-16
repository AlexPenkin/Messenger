'use strict'
var app = require(__dirname + '/../../app.js');
var socketChat = require(__dirname + '/../socketChat.js');

app.app.route('/')
  .get(function(req, res, next) {
    if (req.user) {
      if (req.user.role != 'undefined') {
        var arr = [];
        for (let i = 0; i < req.user.conversations.length; i++) {
          arr.push(req.user.conversations[i].chatName);
        }
        var chats = arr.map(function(item) {
          let it = item.split(req.user.username);
          for (var o = 0; o < it.length; o++) {
            if (it[o] == '' || it[o] == req.user.username || it[o] == undefined) {} else {
              return it[o];
            }
          }

        })
        res.render('index', {
          user: req.user,
          chats: chats
        });
      } else if (req.user.role == 'undefined') {
        res.redirect('/moderation')
      }
    } else {
      res.redirect('/login')
    }
  });
