var app = require(__dirname + '/../../app.js');
var passport = require(__dirname + '/../passport.js')
app.app.route('/basic')
  .get(passport.authenticate('basic'),function(req, res, next) {
    if (!req.user) {
      console.log('Basic!');
      res.render('login');
    } else {
      res.status(200).send({
        status: 'success',
        message: 'Успешно, сейчас вы будете перенаправлены!'
      });
    }
  })
  .post(passport.authenticate('basic'), function(req, res, next) {
      console.log("BASIC Post");
      res.status(200).send({
        status: 'success',
        message: 'Basic Autorization Succeseful!'
      });
  });
