'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');

app.app.route('/contacts')
  .get(function(req, res, next) {
    function findYourSelf() {
      return new Promise((resolve, reject) => {
        User.findOne({
          username: req.user.username
        }, function(err, pers) {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            resolve(pers);
          }
        });
      });
    };

    if (req.user) {
      let userObj = {
        user: new Object()
      }


function findContacts(user) {
  return new Promise ((resolve, reject) => {
    var obj = {};
    obj.user = user;
    //obj.user = req.user;
    obj.contactss = [];
    console.log(1);
    if (req.user.contacts.length != 0){
    for (let i = 0; i < user.contacts.length; i++) {
      console.log('I: ' + i);
      User.findOne({username: user.contacts[i]}, function(err, pers) {
        if (err) {
          console.log(err);
          throw new Error('Контакты скорее всего пусты + 1');
          reject(err)
        } else if (i == (user.contacts.length - 1)) {
          obj.contactss.push({
            name : pers.username,
            avatar : pers.avatar ? pers.avatar.href : ''
           })
           console.log("obj" + obj);
          resolve(obj);
        }
          else {
            obj.contactss.push({
              name : pers.username,
              avatar : pers.avatar ? pers.avatar.href : ''
             })
            //res.end();
        }
      })
    }
  } else {
    throw new Error('Контакты скорее всего пусты + 1');
    reject(err)
  }

  })
}

      findYourSelf()
      .then(resp => findContacts(resp))
      .then(resp => res.render('contacts', resp))
      .catch(err => {
        console.log(err);
        res.render('contacts', {user: req.user})
      });

    } else {
      res.redirect('/login');
    }



  });
