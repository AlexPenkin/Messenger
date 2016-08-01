'use strict'
document.addEventListener("DOMContentLoaded", ready);
console.log('TEST');

function ready() {
  var buttonLogOut = document.getElementById('logOut');
  buttonLogOut.addEventListener("click", function(){logOut('/logOut').then(
     window.location.replace("/login")).catch(err => console.log(err))});
}

function logOut(url) {
  console.log('promise');
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = function() {

      if (this.status == 200) {
          resolve(
            this.response
          );

      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error.code);
      }
    };

    xhr.onerror = function(err) {
      reject(new Error("Network Error"));
    };


  });
}
