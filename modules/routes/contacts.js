'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');

app.app.route('/contacts')
  .get(function(req, res, next) {
    if(req.user) {
    let userObj = {
      user: req.user
    }
    res.render('contacts', userObj)
  } else {
    res.redirect('/login');
  }



});

function add (a) {
  var a = a;
  return function(b){
    console.log(a + b);
  }
}
add(2)(3);
