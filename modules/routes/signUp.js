'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
const crypt = require(__dirname + '/../crypt.js');

app.app.route('/signUp')
  .get(function(req, res, next) {
    if (!req.user) {
      res.render('signUp', {});
    } else {
      res.redirect('/')
    }

  })
  .post(function(req, res, next) {
    var newUser = new User({
      username: req.body.username,
      usernameLow: req.body.username.toLowerCase(),
      password: crypt(req.body.password),
      email: req.body.email
    });
    newUser.save(function(err) {
      if (err) {
        res.status(300).send('Ошибка сохранения в базу данных');
        console.log(err);
      } else {
        app.mkdirp(`${__dirname}/../../users/${req.body.username}/avatars/`, function(err) {
          if (err) console.error(err)
          else console.log(`Directory created! in ${__dirname}/../../users/${req.body.username}/avatars/`);
        });

        app.gm(100, 100, "#ddff99f3")
          .drawCircle(50, 50, 50, 100)
          .font("Helvetica.ttf", 12)
          .drawText(50, 50, req.body.username.charAt(0).toUpperCase())
          .write(`/new.jpg`, function(err) {
            if (err) console.error(err)
            else console.log(`Pic created! in ${__dirname}/../../../../../../`);
          });

        res.status(200).send('Успешно, сейчас вы будете перенаправлены!');

      }
    });

  })
