'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
app.app.route('/user/:username')
  .get(function(req, res, next) {
    if (req.user) {
      let query = req.params.username;
      let userObj = {
        user: req.user,
        searchUser: new Object,
        users: new Array
      }

      function searchAllUsersExceptYourself(response) {
        return new Promise((resolve, reject) => {
          let results = new Array;
          let stream = User.find({
            username: {
              $not: {
                $eq: req.params.username
              },
              $nin: userObj.searchUser.contacts

            },
            role: {
              $not: {
                $eq: 'undefined'
              }
            }
          }).cursor();
          stream.on('data', function(doc) {
            response.users.push(doc);
          }).on('error', function(err) {
            console.log(err);
            reject(err);
          }).on('close', function() {
            resolve(response)
          });
        })
      }

      function searchUser(query) {
        return new Promise((resolve, reject) => {
          let stream = User.find({
            username: query
          }).cursor();
          stream.on('data', function(doc) {
            userObj.searchUser = doc;
          }).on('error', function(err) {
            console.log(err);
            reject(err);
          }).on('close', function() {
            resolve(userObj)
          });
        })
      }
      searchUser(query).then(resp => searchAllUsersExceptYourself(resp)).then(response => {
        res.render('userPage', response);
      }).catch(err => {
        console.log(err);

      })
    } else {
      res.redirect('/login');
    }

  })
