var app = require(__dirname + '/../../app.js');

app.app.route('/logOut')
  .get(function(req, res, next) {
    if(req.user){
      req.logout();
      res.status(200).send({status: 'success'});
    } else {
      res.status(400).send({status: 'Erorr'});
  }
}
).post(function(req, res, next) {
  res.status(200).send({text: 'There nothing intirested'});
})
