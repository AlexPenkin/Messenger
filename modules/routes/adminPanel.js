var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
app.app.route('/adminPanel')
  .get(function(req, res, next) {
    if (req.user) {  if (req.user.role == "admin") {

        function undefinedUsersProm(){
           return new Promise (function(resolve, reject) {
          adminObj = {
            user: req.user,
            uncommitedUsers: new Array,
          }
          var stream = User.find({
            role: 'undefined'
          }).cursor();

          stream.on('data', function(doc) {
            adminObj.uncommitedUsers.push(doc);
          }).on('error', function(err) {
            console.log(err);
            reject(err);
          }).on('close', function() {
            resolve(adminObj)

          });
        })
      }
        undefinedUsersProm().then(result => res.render('adminPanel', result)).catch(err => {console.log(err)});

      } else {
        res.redirect('/')
      }}
      else {
        res.redirect('/')
      }

  });
