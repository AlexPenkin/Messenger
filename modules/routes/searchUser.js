var app = require(__dirname + '/../../app.js');
const User = require(__dirname + '/../schemaes/User.js');

app.app.route('/searchUser')

.post(function(req, res, next) {
  console.log(req.body.search);
  var query = new RegExp(req.body.search, 'i');

  function searchUser(query) {

    return new Promise((resolve, reject) => {
      console.log("promise");
      var results = new Array;
      var stream = User.find({
        username: {
          $regex: query

        }, role:{$not:{$eq: 'undefined'}}
      }).cursor();
      stream.on('data', function(doc) {
        console.log(doc);
        results.push(doc.username);
      }).on('error', function(err) {
        console.log(err);
        reject(err);
      }).on('close', function() {
        console.log('done');
        resolve(results)

      });

    })
  }
  searchUser(query).then(result => res.status(200).send(result));
});
