var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
app.app.route('/defineUser')
  .get(function(req, res, next) {
    if (req.user && (req.user.role = "admin")) {

    } else {
      res.redirect('/login')
    }
  })
  .post(function(req, res, next) {
    function defineUser() {
      return new Promise((resolve, reject) => {
        User.update({
          username: req.body.username
        }, {
          $set: {
            role: req.body.role
          }
        }, function(err, num) {
          if (err) {
            console.log(err);
            reject(new Error(err))
          }
          resolve(num);
        })
    })
  }
      function declineUser () {
        return new Promise((resolve, reject) => {
          User.remove({
            username: req.body.username
          }, function(err, sum) {
            if (err) {
              console.log(err);
              reject(new Error(err));
            } else {
              resolve(sum);
            }

          });
        })
      }



    if (req.body.role == 'undefined') {
      res.status(200).send('Выберите роль');
    } else if (req.body.role == 'decline') {
      declineUser()
        .then(result => {
          res.status(200).send('Удален');
        })
        .catch(err => {
          res.status(500).send('Ошибка' + err)
        })
    } else {
      defineUser()
        .then(result => {
          console.log(result);
          res.status(200).send('Сохранено');
        })
        .catch(err => {
          res.status(500).send('Ошибка' + err)
        })
    }
  })
