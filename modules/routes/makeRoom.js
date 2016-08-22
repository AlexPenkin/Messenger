'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');

function MakeRoom(name, collection, users, masters) {
  this.collection = collection
  this.name = name;
  this.pmid = Math.random() * 100000000000000000 + '';
  this.masters = masters || [req.user];
  this.users = users;
}

MakeRoom.prototype.saveToDb = function() {
  let self = this;
  console.log(self.users.length);
  for (let i = 0; i < self.users.length; i++) {
    console.log('i1: ' + i);
    console.log(self.users[i]);
    self.collection.findOne({
      username: self.users[i]
    }, function(err, pers) {
      if (err) {
        console.log(err);
      } else {
        console.log('there');
        if (pers.rooms.length == 0) {
          pers.rooms.push({
            roomName: self.name,
            PMID: self.pmid,
            messages: [],
            admins: self.masters,
            participants: self.users,
          })
          pers.save(function(err) {
            if (err) return handleError(err)
            console.log('Room Created!');
          });
        } else {
          for (let i = 0; i < pers.rooms.length; i++) {
            console.log('i2: ' + i);
            if (pers.rooms[i].roomName == self.name) {
              console.log('room exist');
              return;
            } else if ((pers.rooms[i].roomName != self.name) && (i == pers.rooms.length - 1)) {
              pers.rooms.push({
                roomName: self.name,
                PMID: self.pmid,
                messages: [],
                admins: self.masters,
                participants: self.users,
              })
              pers.save(function(err) {
                if (err) return handleError(err)
                console.log('Room Created!');
              });
            }
          }
        }


      }
    })
  }
}

app.app.route('/makeRoom')
  .get(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    } else {
      res.render('makeRoom', {
        user: req.user
      });
    }
  })
  .post(function(req, res, next) {
    let room = new MakeRoom(req.body.name, User, req.body.users, req.body.masters);
    room.saveToDb();
    res.status(200).send(req.body)

  })
