'use strict'
var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');

Array.prototype.contains = function(elem) {
  for (var i in this) {
    if (this[i] == elem) return true;
  }
  return false;
}

app.app.route("/notification")
  .get(function(req, res) {
    app.notificationEmitter.on('messageNotification', function(name, message, participants) {
      var parts = [];
      participants.forEach(function(item, i) {
        parts[i] = item;
      });
      let index = parts.indexOf('' + name);
      if ((participants.length == parts.length) && (participants.length > 1)) {
        parts.splice(index, 1);
      }

      let str = '';
      for (let i = 0; i < parts.length; i++) {
        if (i == parts.length - 1) {
          str += '"' + parts[i] + '"';
        } else {
          str += '"' + parts[i] + '"' + ', '
        }
      }

      if (!res.headersSent) {
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive"
        })
      }
      res.write("retry: 10000\n");
      res.write(`data: {"msg": "${message}","sender": "${name}","parts": [${str}]}\n\n`);

    });
  })
