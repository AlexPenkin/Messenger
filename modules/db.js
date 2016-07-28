const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/chat');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Mongo connected and work.');
  });

var Schema = mongoose.Schema;
module.exports.Schema = Schema;
module.exports.mongoose = mongoose;
