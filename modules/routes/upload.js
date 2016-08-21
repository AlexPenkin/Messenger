'use strict'
var app = require(__dirname + '/../../app.js');
const os = require('os');
const User = require(__dirname + '/../schemaes/User.js');



app.app.route('/uploadAva')
  .post(function(req, res, next) {
    var saveTo = `${__dirname}/../../public/users/${req.headers.user}/avatars/${req.headers.filename}`;

    (function() {
      req.pipe(app.fs.createWriteStream(saveTo))
      req.on('end', function() {
        res.end('ok');
      });

    })();

    (function() {
      var stream = app.fs.createReadStream(saveTo);
      var img = '';
      stream.on('data', function(chunk) {
        img += chunk;
      })
      stream.on('end', function() {
        User.update({
          username: req.headers.user
        }, {
          $set: {
            avatar: {
              href: `/users/${req.headers.user}/avatars/${req.headers.filename}`
            }
          }
        }, function(err, n) {
          if (err) {
            console.log(err);
          } else {
            res.end('ok');
            console.log(n);
          }
        })
      })

    })();


    //Resize image
    /*app.gm(saveTo )
    .resize(100, 100)
    .write(saveTo , function (err) {
  if (!err) console.log('done');
});*/


  })
