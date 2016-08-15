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

      findYourSelf().then(resp => res.render('contacts', resp)).catch(err => console.log(err));

    } else {
      res.redirect('/login');
    }



  });
