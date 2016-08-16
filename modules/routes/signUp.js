'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
const crypt = require(__dirname + '/../crypt.js');

app.app.route('/signUp')
  .get(function(req, res, next) {
    if(!req.user){
      res.render('signUp', {});
    } else {
      res.redirect('/')
    }

  })
  .post(function(req,res, next){
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
      app.mkdirp(`/users/${req.body.username}/avatars/`, function (err) {
        if (err) console.error(err)
        else console.log('Directory created!');
});

      res.status(200).send('Успешно, сейчас вы будете перенаправлены!');

    }
  });

  })
