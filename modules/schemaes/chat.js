const db = require(__dirname + '/../db.js');
var Chat = new db.Schema({
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
  conversations: [String],
  rooms: [String],
  role: {
    type: String,
    default: "undefined"
  }
});
modelChat = db.mongoose.model('Chat', Chat);
module.exports = modelChat;
