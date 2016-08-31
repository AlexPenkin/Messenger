const db = require(__dirname + '/../db.js');

var Chats = new db.Schema({
  chatName: String,
  PMID: String,
  messages: [{
    name: String,
    message: String,
    date: Date,
    readed: Boolean
  }],
  initializator: String,
  participant: String,
  date: {
    type: Date,
    default: Date.now
  }
});

var Rooms = new db.Schema({
  roomName: String,
  PMID: String,
  messages: [{
    name: String,
    message: String,
    date: Date,
    readed: Boolean
  }],
  initializator: String,
  admins: [String],
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
  online: String,
  hash: String,
  pin: Number,
  date: {
    type: Date,
    default: Date.now
  },
  avatar: db.Schema.Types.Mixed,
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
