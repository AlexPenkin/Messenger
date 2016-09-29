'use strict'
var app = require(__dirname + '/../../app.js');
var socketChat = require(__dirname + '/../socketChat.js');
const User = require(__dirname + '/../schemaes/User.js');
var Me = class Me {
  constructor(username, userObj) {
    this.username = username;
    this.user = userObj;
  }
};

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

      var findMe = new Promise((resolve, reject) => {
        User.findOne({
          username: req.user.username
        }, function(err, pers) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("GETTER!!!");
            resolve(pers);
          }
        });
      });




      function makeObj(user) {
        return new Promise((resolve, reject) => {
          let me = new Me(req.user.username, user);
          resolve(me);
        })
      }

      findMe.then(resp => makeObj(resp).then(resp => {
        res.render('index', resp);
        console.log(resp.user.conversations[0]);
      })).catch(err => console.log(err));


    } else if (req.user.role == 'undefined') {
      res.redirect('/moderation')
    }
  } else {
    res.redirect('/login')
  }
});
