/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
'use strict';

var socket = io();
var input = document.getElementById('chatInput');
var send = document.getElementById('chatSend');
var userMessages = document.getElementById('chatUserMessages');
var online = document.getElementById('onlineUsers');

send.addEventListener("click", function (event) {
  if (input.value != '') {
    socket.emit('sendOnServer', {
      message: input.value,
      user: user
    });
  } else {
    alert("Пустое поле");
  }
});

socket.on('connect', function (data) {
  socket.emit('connectUser', {
    user: user
  });
});

socket.on('connectedUsers', function (data) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = data.user + " подключился!";
  userMessages.appendChild(newMessage);
});

socket.on('disconnectedUsers', function (data) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = data.user + " отключился!";
  userMessages.appendChild(newMessage);
});

socket.on('onlineUsers', function (data) {
  online.innerHTML = "Пользователей онлайн: " + data.quanity;
});

socket.on('successfulMessage', function (data) {
  var newMessage = document.createElement("p");
  newMessage.innerHTML = data.user + ": " + data.message;
  userMessages.appendChild(newMessage);
  input.value = '';
});

/***/ }
/******/ ]);