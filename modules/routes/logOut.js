var app = require(__dirname + '/../../app.js');

app.app.route('/logOut')
  .get(function(req, res, next) {
    if(req.user){
      req.session.destroy();
      req.logout();
      res.status(401).send({status: 'Erorr'});
      console.log('LOGOUT');
      res.redirect('/login');
    } else {
      res.status(400).send({status: 'Erorr'});
  }
}
).post(function(req, res, next) {
  res.status(200).send({text: 'There nothing intirested'});
})
