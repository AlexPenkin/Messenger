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

            resolve({
                user: pers
              });
          }
        });
      });
    };

    if (req.user) {
      let userObj = {
        user: new Object()
      }


function findContacts() {
  return new Promise ((resolve, reject) => {
    var obj = {};
    //obj.user = req.user;
    obj.contactsO = [];
    console.log(1);
    for (let i = 0; i < req.user.contacts.length; i++) {
      User.findOne({username: req.user.contacts[i]}, function(err, pers) {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          console.log('work');
          console.log(2);
          obj.contactsO.push('asd')
        }
      })
    }
    log3
    console.log(obj);
    resolve(obj);
  })
}

      findYourSelf()
      .then(resp => findContacts())
      .then(resp => res.render('contacts', resp))
      .catch(err => console.log(err));

    } else {
      res.redirect('/login');
    }



  });
