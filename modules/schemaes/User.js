const db = require(__dirname + '/../db.js');

var Chats = new db.Schema({
  messages: [{
    name: String,
    message: String,
    date: Date
  }],
  participant: String,
  date: {
    type: Date,
    default: Date.now
  }
});

var Rooms = new db.Schema({
  name: String,
  messages: [{
    name: String,
    message: String,
    date: Date
  }],
  participants: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

var User = new db.Schema({
  username: {
    type: String,
    unique: true
  },
  usernameLow: {
    type: String,
    unique: true
  },
  password: String,
  email: String,
  date: {
    type: Date,
    default: Date.now
  },
  avatar: String,
  contacts: [String],
  conversations: [Chats],
  rooms: [Rooms],
  role: {
    type: String,
    default: "undefined"
  }
});
modelUser = db.mongoose.model('User', User);
module.exports = modelUser;
