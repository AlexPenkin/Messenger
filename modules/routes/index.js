var app = require(__dirname + '/../../app.js');
var socketChat = require(__dirname + '/../socketChat.js');

app.app.route('/')
  .get(function(req, res, next) {
    if (req.user){
      if (req.user.role != 'undefined') {
        res.render('index', {
          user: req.user
        });
      } else if (req.user.role == 'undefined') {
        res.redirect('/moderation')
      }
    }
     else {
      res.redirect('/login')
    }
  });
