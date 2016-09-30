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

  if (optionsObj.loadstart) xhr.onloadstart = optionsObj.loadstart;
  if (optionsObj.loadstart) xhr.load = optionsObj.loadSuccessful;
  if (optionsObj.loadstart) xhr.onloadend = optionsObj.loadend;
  if (optionsObj.onerror) xhr.onerror = optionsObj.onerror
  else xhr.onerror = function(err) {
    console.log(err);
  }
}

var optionsObj = {
  method: "POST",
  body: {
    username: itemJS.messages[itemJS.messages.length-1].name != username ? itemJS.messages[itemJS.messages.length-1].name : username
  }
}

ajaxQueryForm('/test', optionsObj, function(res) {
  console.log('done with: ' + res);
});
(function(){console.log('aa')})()
