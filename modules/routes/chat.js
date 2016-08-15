'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');
var recipient;
var selfName;
var rec;
var chatName
var rand = (Math.random() * 100000000000000000 + '');
var obj = {
  sender: '',
  recipient: '',
  PMID: '',
  chatName: ''
}
module.exports = obj;
var socketPrivateChat = require(__dirname + '/../privateMessage.js');
app.app.route('/startChat/:username')
  .get(function(req, res, next) {
    selfName = req.user.username;
    obj.recipient = req.params.username;
    obj.sender = req.user.username;
    let self;
    recipient = req.params.username;
    chatName = ( req.params.username > req.user.username) ? req.params.username + req.user.username : req.user.username + req.params.username;
    obj.chatName = chatName;
    console.log(obj);
    let userObj = {
      user: req.user,
      recipient: recipient,
      chatName: chatName
    }

    function findYourSelf() {
      console.log(selfName);
      return new Promise((resolve, reject) => {
        User.findOne({
          username: selfName
        }, function(err, pers) {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            self = pers;
            obj['user'] = self;
            resolve(self);
          }
        });
      });
    };

    function loadComments () {
      return new Promise((resolve, reject) =>{
        User.find({username: selfName}, {
          'conversations.$.chatName' : chatName
        }), function (err,pers) {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            console.log(pers);
            resolve(pers);
          }
        }
      });
    }

    function findRecipient() {

      return new Promise((resolve, reject) => {
        User.findOne({
          username: recipient
        }, function(err, pers) {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            rec = pers;
            resolve(rec);
          }
        });
      });
    };

    function checkChat(user) {
      if (user.conversations.length > 0) {

        if (user.conversations.length == 1 && user.conversations[0].chatName != chatName) {
          console.log('chat not exist');
          obj.PMID = rand;
          user.conversations.push({
            chatName : chatName,
            PMID: rand
          });
          user.save(function(err) {
            if (err) return handleError(err)
            console.log('Success!');
          });
        } else {
          for (let i = 0; i < user.conversations.length; i++) {
            if (user.conversations[i].chatName == chatName ) {
              console.log('Chat really exist!!!');
              obj.PMID = user.conversations[i].PMID;
              userObj.messages = user.conversations[i].messages;
              return;
            } else if ((user.conversations[i].chatName != chatName) && (i == (user.conversations.length - 1))) {
              user.conversations.push({
                chatName : chatName,
                PMID: rand
              });
              user.save(function(err) {
                if (err) return handleError(err)
                console.log('Success!');
              });

            }
          }
        }
      } else {
        console.log('chat not exist');
        obj.PMID = rand;
        user.conversations.push({
          chatName : chatName,
          PMID: rand
        });
        user.save(function(err) {
          if (err) return handleError(err)
          console.log('Success!');
        });
      }
    }

    findYourSelf().then(resp => {
        checkChat(resp);
      })
      .then(resp => {
        return findRecipient()
      })
      .then(resp => {
        checkChat(resp);
        res.render('messagePage', userObj);
      })
      .catch(err => {
        console.log('Fatal Error' + err)
      });







    //let chat = User.conversations.findOne({participant : req.params.username}) || undefined;
  });
