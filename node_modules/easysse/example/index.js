var http    = require("http"),
    path    = require("path"),
    express = require("express"),
    easysse = require("../lib/easysse");

var app     = express(),
    server  = http.createServer(app);

app.use(express.bodyParser());

app.use("/", express.static(__dirname));

app.get("/chat-events", easysse);

app.post("/chat", function(req, res) {
  console.log("chat post event", req.body);
  easysse.emit("chat", req.body.username, req.body.message);
});

server.listen(function() {
  var address = server.address();
  console.log("listening on http://%s:%d", address.address, address.port);
});

