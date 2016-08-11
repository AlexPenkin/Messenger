'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
app.app.route('/unassignUser')
  .post(function(req, res, next) {
    var bodys = req.body;
    console.log(bodys);

    function pushContacts() {
      return new Promise((resolve, reject) => {
          User.update({
            username: bodys['user']
          }, {
            $pull: {
              contacts: bodys.addUser
            }
          }, function(err, num) {
              if (err) {
                console.log(err);
                reject(new Error(err))
              } else {
                console.log("ITS HERE");
                resolve(num);
              }
          })

      })
    }
    pushContacts().then(resp => {
      res.status(200).send({
        status: 'success',
        user: bodys['user']
      }).catch(err => {
        res.status(200).send({
          status: 'error',
          user: bodys['user']
        })
      });
    })



  })
