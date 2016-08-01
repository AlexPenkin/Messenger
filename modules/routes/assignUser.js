'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
app.app.route('/assignUser')
  .post(function(req, res, next) {
    var bodys = req.body;
    let length = Object.keys(bodys).length;
    for (let i = 0; i < length - 1; i++) {
      console.log("item: " + bodys['user'+ i]);
    }
    res.status(200).send('Work');
  }
)
