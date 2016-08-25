'use strict'
  var notification = document.getElementById('notification')
  var source = new EventSource('/notification?name=' + USER);
  console.log('in notifications');

  source.addEventListener('message', function(e) {
      console.log('in data');
    alert(e.data);
    notification.style.display = 'block';


  }, false)

  source.addEventListener('open', function(e) {
    console.log("Connection was opened")
  }, false)

  source.addEventListener('error', function(e) {
    if (e.readyState == EventSource.CLOSED) {
      console.log("Connection was closed")
    }
  }, false)
