'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
const crypt = require(__dirname + '/../crypt.js');

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

var arrayOfColors = ['#99ffcc', '#4dffa6', '#8f246b', '#1a75ff', '#4d94ff', '#00e6e6', '#ff8080', '#800000', '#ff7733'];

app.app.route('/signUp')
  .get(function(req, res, next) {
    if (!req.user) {
      res.render('signUp', {});
    } else {
      res.redirect('/')
    }
  })
  .post(function(req, res, next) {

    var newUser = new User({
      username: req.body.username,
      usernameLow: req.body.username.toLowerCase(),
      password: crypt(req.body.password),
      email: req.body.email
    });

    newUser.save(function(err) {
      if (err) {
        res.status(300).send('Ошибка сохранения в базу данных');
        console.log(err);
      } else {
        app.mkdirp(`${__dirname}/../../users/${req.body.username}/avatars/`, function(err) {
          if (err) console.error(err)
          else console.log(`Directory created! in ${__dirname}/../../users/${req.body.username}/avatars/`);
        });
      }
    });

    function drawAvatar() {
      return new Promise((resolve, reject) => {
        app.gm(2000, 2000, '#00ffffff')
          .fill(arrayOfColors[randomInteger(0, arrayOfColors.length)])
          .drawCircle(1000, 1000, 1000, 1900)
          .fontSize(1000)
          .fill('#ffffff')
          .drawText(720, 1350, req.body.username.charAt(0).toUpperCase())
          .write(`${__dirname}/../../users/${req.body.username}/avatars/avatarFull.png`, function(err) {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              console.log(`Pic created!`)
              resolve('all good');
            }
          });
      })
    }


    function resizeAvatar() {
      return new Promise((resolve, reject) => {
        app.gm(`${__dirname}/../../users/${req.body.username}/avatars/avatarFull.png`)
          .resize(100, 100)
          .write(`${__dirname}/../../users/${req.body.username}/avatars/avatar.png`, function(err) {
            if (err) {
              console.error(err)
              reject(err)
            } else {
              console.log(`Pic created!`)
              resolve('all good');
            }
          });
      })
    }

    function deleteAvatar() {
      return new Promise((resolve, reject) => {
        app.fs.unlink(`${__dirname}/../../users/${req.body.username}/avatars/avatarFull.png`, function(err) {
          console.log("that");
          console.log(arguments);
          if (err) {
            console.error(err)
            reject(err)
          } else {
            console.log(`Pic deleted!`)
            resolve('all good');
          }
        })
      })
    }


var aa;
    drawAvatar()
      .then(res => {

        app.fs.readFile(`${__dirname}/../../users/${req.body.username}/avatars/avatarFull.png`, function(err, data) {
      if (err) throw err; // Fail if the file can't be read.
      console.log(data);
      aa = 'data:image/jpeg;base64';
      console.log(aa);
    });
    resizeAvatar();
  })
      //.then(res => deleteAvatar())
      .catch(err => console.log(err))


    res.status(200).send('Успешно, сейчас вы будете перенаправлены!');





  })
