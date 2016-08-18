var app = require(__dirname + '/../../app.js');
var passport = require(__dirname + '/../passport.js')
var img = {};
app.app.route('/login')
  .get(function(req, res, next) {
    if(!req.user){
      app.fs.readFile(`${__dirname}/../../users/3/avatars/avatar.png`, function(err, data) {
        if (err) throw err; // Fail if the file can't be read.
        console.log(data);
        img.uri = data.toString('base64')
        img.a = 'a'
        res.render('login', img);
      });

    } else {
      res.redirect('/')
    }
  })
  .post(passport.authenticate('local', {
    /*successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false*/
  }), function(req, res, next) {
    res.status(200).send({status: 'success', message: 'Успешно, сейчас вы будете перенаправлены!'});
    //res.redirect('/login');
  });
