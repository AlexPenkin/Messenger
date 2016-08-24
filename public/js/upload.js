'use strict';

var boundary = String(Math.random()).slice(2);

function uploadFile(form) {}

/*form( name = 'uploadAva')
  input(type='file' name='fileUploaded')
  input(type='submit' value = 'Загрузить аватар')
*/
document.forms.uploadAva.onsubmit = function () {
  var input = this.elements.fileUploaded;
  var file = input.files[0];
  if (file) {
    upload(file);
  }
  return false;
};

function upload(file) {
  var xhr = new XMLHttpRequest();
  console.log(file);

  xhr.upload.onprogress = function (event) {
    console.log(Math.round(event.loaded / event.total * 100) + '%');
  };
  xhr.onload = xhr.onerror = function () {
    var _this = this;

    setTimeout(function () {
      if (_this.status == 200) {
        console.log("success");
        location.reload();
      } else {
        console.log("error " + _this.status);
      }
    }, 500);
  };
  var name = file.name;
  var ext = name.split('.').pop();
  console.log(ext);
  xhr.open("POST", "/uploadAva", true);
  //xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
  xhr.setRequestHeader('fileName', 'avatar.' + ext);
  xhr.setRequestHeader('user', USER);
  xhr.send(file);
}