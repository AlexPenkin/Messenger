const db = require(__dirname + '/../db.js');
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
      role: {
        type: String,
        default: "undefined"
      }
    });
modelUser = db.mongoose.model('User', User);
module.exports = modelUser;
