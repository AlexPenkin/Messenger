// easysse-client 0.9.0

// (c) 2014 nkitsune, mosdef.biz
// easysse-client may be freely distributed under the BSD license.
// For all details and documentation:
// https://github.com/mosdefbiz/easysse-client

(function(root, factory) {

  // AMD
  if (typeof define === "function" && define.amd) {
    define(["exports"], function(exports) {
      root.easysseClient = factory(root, exports);
    });
  }

  // CommonJS
  else if (typeof exports !== "undefined") {
    factory(root, exports);
  }

  // Browser
  else {
    root.easysseClient = factory(root, {});
  }

}(this, function(root, easysseClient) {

  var Client = function Client(eventSource) {

    // private api
    var listening = false,
        listeners = {};

    function addEventListener(type, cb) {
      if (!Array.isArray(listeners[type])) {
        listeners[type] = [];
      }
      if (typeof cb === "function") {
        listeners[type].push(cb);
      }
    }

    function removeEventListener(type, cb) {
      if (!Array.isArray(listeners[type]) || typeof cb !== "function") {
        listeners[type] = [];
      }
      return listeners.splice(listeners.indexOf(cb), 1);
    }

    function dispatchEvent(rawEvent) {
      console.log("event received", rawEvent);
      var event = JSON.parse(rawEvent.data);

      if (!Array.isArray(listeners[event.type])) {
        listeners[event.type] = [];
      }

      (listeners[event.type] || []).forEach(function(listener) {
        listener.apply(rawEvent, event.arguments);
      });
    }

    function start() {
      if (!listening) {
        listening = true;
        eventSource.addEventListener("message", dispatchEvent);
      }
    }

    function stop() {
      if (listening) {
        listening = false;
        eventSource.removeEventListener("message", dispatchEvent);
      }
    }

    // public api
    this.start                = start;
    this.stop                 = stop;
    this.addEventListener     = addEventListener;
    this.removeEventListener  = removeEventListener;
    this.dispatchEvent        = dispatchEvent;

    // aliases
    this.on   = addEventListener;
    this.off  = removeEventListener;
    this.emit = dispatchEvent;

    // init
    this.start();
  };

  easysseClient.connect = function connect(path) {
    var eventSource = new EventSource(path);
    return new Client(eventSource);
  };

  return easysseClient;

}));
