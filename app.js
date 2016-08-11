const express = require('express');
module.exports.app = app = express();
const server = require('http').Server(app);
const db = require('./modules/db.js');
const path = require('path');
const publicFold = path.join(__dirname + '/public');
const views = path.join(__dirname + '/views');
const pug = require('pug');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
var passport = require(__dirname + '/modules/passport.js')


var d = new Date();

server.listen('7777', () => console.log(`App worked on port 7777 ${d.toLocaleString()}`));
const io = require('socket.io')(server);
module.exports.io = io;

app.set('view engine', 'pug');
app.set('views', views);
app.use(express.static(publicFold));
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
}));
app.use(session({   secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 60480000
    }}));
app.use(passport.initialize());
app.use(passport.session());


// Routes

var index = require(__dirname + '/modules/routes/index.js');
var login = require(__dirname + '/modules/routes/login.js');
var signUp = require(__dirname + '/modules/routes/signUp.js');
var logOut = require(__dirname + '/modules/routes/logOut.js');
var adminPanel = require(__dirname + '/modules/routes/adminPanel.js');
var defineUser = require(__dirname + '/modules/routes/defineUser.js');
var moderation = require(__dirname + '/modules/routes/moderation.js');
var searchUser = require(__dirname + '/modules/routes/searchUser.js');
var userPage = require(__dirname + '/modules/routes/userPage.js');
var assignUser= require(__dirname + '/modules/routes/assignUser.js');
var unassignUser= require(__dirname + '/modules/routes/unassignUser.js');
var contacts= require(__dirname + '/modules/routes/contacts.js');

app.get("/:page?", function(req, res) {
  var page = req.params.page;
  if (page != undefined) res.redirect("/");
});
