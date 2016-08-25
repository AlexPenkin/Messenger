node-easysse
============

Easy Server-Sent Events, sincerely, most definitely


Demo
----

This demo show [easysse-client][client] working in tandem with node-easysee

```text
$ cd node-easysse && npm install && npm run-script example

> easysse@0.0.0 example /Users/dnukem/code/easysse
> node ./example

listening on http://0.0.0.0:65428
```

Open a couple browser tabs at the binding address and click the button. Each tab
will be synchronized with one another.


Usage
-----

Currently easysse is configured as an express middleware

```js
var require("easysse");
app.get("/chat-stream", easysse);

app.post("/chat", function(req, res) {
  easysse.emit("chat", req.body.username, req.body.message);
});
```

Using [easysse-client][client]

```html
<script src="easysse-client.js"></script>
<script>
  var client = easysseClient.connect("/chat-stream");
  client.on("chat", function(username, message){
    console.log(username, "says", message);
  });

  $.post("/chat", {username: "mjackson", message: "hehe"});
  // "mjackson says hehe"
</script>
```


API
---

* **easysse** &mdash; is an express middleware with two parameters (`req` and `res`)

* **easysse.emit(eventType[, arg1, ..., argN])** &mdash; emit an event to all connected
clients


Compatibility
-------------

Tested on Chrome 33
Please submit any other compatibility reports


License
-------

&copy; 2014 nkitsune, mosdef.biz
easysse may be freely distributed under the BSD license.
For all details and documentation:
https://github.com/mosdefbiz/easysse

[client]: https://github.com/mosdefbiz/easysse-client
