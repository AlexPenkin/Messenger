document.addEventListener("DOMContentLoaded", ready);

function ready() {
  var buttonLogOut = document.getElementById('logOut');  
  buttonLogOut.addEventListener("click", function(){logOut('/logOut').then(
     window.location.replace("/login")).catch(console.log('Error'))});
}

function logOut(url) {
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

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };


  });
}
