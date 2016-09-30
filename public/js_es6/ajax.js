function ajaxQueryForm(url, optionsObj, callBack) {
  var xhr = new XMLHttpRequest(),
    keys = Object.keys(optionsObj.body),
    body,
    headType = optionsObj.head ? optionsObj.head[0] : 'Content-Type',
    headVal = optionsObj.head ? optionsObj.head[1] : 'application/x-www-form-urlencoded'
  xhr.open((optionsObj.method || 'GET'), url);
  xhr.setRequestHeader(headType, headVal);
  for (var i = 0; i < keys.length; i++) {
    if (i === 0) {
      body = "" + keys[i] + "=" + "" + encodeURIComponent(optionsObj.body[keys[i]]);
    } else {
      body += "&" + keys[i] + "=" + "" + encodeURIComponent(optionsObj.body[keys[i]]);
    }
  }
  xhr.send(body);
  xhr.onload = function() {
    if (this.status == 200) {
      callBack(this.response);
    } else {
      console.log(this.statusText);
    }
  }
  if optionsObj.loadstart xhr.loadstart = optionsObj.loadstart;
  if optionsObj.loadstart xhr.load = optionsObj.loadSuccessful;
  if optionsObj.loadstart xhr.loadend = optionsObj.loadend;
  xhr.onerror = function(err) {
    console.log(err);
  };
}

//Some sort of documentation
var optionsObj = {
  method: "POST",
  head: ['Content-Type', 'application/x-www-form-urlencoded'],
  body: {
    name: 'Alex',
    lastName: 'Пенкин'
  },
  loadstart: function() {
    console.log('QueryStart!');
  },
  loadSuccessful: function() {
    console.log('Ended Right!');
  },
  loadend: function() {
    console.log('Ended Somehow!');
  }
};

ajaxQueryForm('/test', optionsObj, function(res) {
  console.log('done with: ' + res);
});
