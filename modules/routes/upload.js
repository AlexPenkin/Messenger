'use strict'
var app = require(__dirname + '/../../app.js');
const os = require('os');
const User = require(__dirname + '/../schemaes/User.js');



app.app.route('/uploadAva')
  .post(function(req, res, next) {
    var saveTo = `${__dirname}/../../users/${req.headers.user}/avatars/avatar.png`;
    req.pipe(app.fs.createWriteStream(saveTo))
    res.end('ok');

    //Resize image
    app.gm(saveTo )
    .resize(100, 100)
    .write(saveTo , function (err) {
  if (!err) console.log('done');
});

    app.fs.readFile(saveTo , function(err, data) {
      if (err) {
        console.log(err);
      } else {
        User.update({username: req.headers.user}, {$set :{avatar: data.toString('base64')}}, function (err, n) {
          if (err) {
            console.log(err);
          } else {
            console.log(n);
          }
        })
      }



    })
  })
