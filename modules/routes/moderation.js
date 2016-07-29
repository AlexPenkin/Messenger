var app = require(__dirname + '/../../app.js');


app.app.route('/moderation')
  .get(function(req, res, next) {
    res.write('Your account on moderation, please wait.');
    res.end();
  });
