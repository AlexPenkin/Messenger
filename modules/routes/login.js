var app = require(__dirname + '/../../app.js');
var passport = require(__dirname + '/../passport.js')
app.app.route('/login')
  .get(function(req, res, next) {    
    if(!req.user){
      res.render('login');
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
