var app = require(__dirname + '/../../app.js');
var socketChat = require(__dirname + '/../socketChat.js');

app.app.route('/')
  .get(function(req, res, next) {
    if(req.user){
      res.render('index', {user: req.user});
    } else {
      res.redirect('/login')
    }
  });
