'use strict'
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const crypt = require('./crypt.js');
const User = require(__dirname + '/schemaes/User.js');

var AuthBasic = require('passport-http').BasicStrategy;


/*passport.use(new AuthBasic(
  function(pin, hash, done) {
    User.findOne({
      hash: hash
    }, function(err, user) {
      if (err) {
        console.log(user);
        console.log('1');
        return done(null, false);
      }
      if (!user) {
        return done(null, false);
        console.log('2');
      }
      if ((user.hash != hash) && ((user.pin + '') != pin)) {
        console.log('3');
        return done(null, false);
      }
      return done(null, user);
    });
  }
));*/

passport.use(new AuthBasic(
  function(pin, hash, done) {
    console.log('inited');
    User.findOne({
      hash: hash
    }, function(err, user) {
      console.log(user);
      if (err) {
        return done(err);
        console.log(1);
      }
      if (!user) {
        return done(null, false);
        console.log(2);
      }
      if ((user.hash != hash) && ((user.pin + '') != pin)) {
        return done(null, false);
        console.log(3);
      }
      console.log(4);
      return done(null, user);

    });
  }
));

/*app.get('/api/me',
  passport.authenticate('basic', {
    session: false
  }),
  function(req, res) {
    res.json(req.user);
  });

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      usernameLow: username.toLowerCase()
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {

        console.log('Incorrect username.');
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (user.password != crypt(password)) {


        console.log('Incorrect password.');
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      console.log(user.password);
      console.log('logged');
      return done(null, user);
    });
  }
));*/

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
