var Event = function Event(type, args) {
  this.id = Date.now();
  this.type = type;
  this.arguments = args;
};

Event.create = function create(type) {
  return new Event(type, [].slice.call(arguments, 1));
};

Event.prototype.serialize = function serialize() {
  return JSON.stringify({type: this.type, arguments: this.arguments});
};

Event.prototype.toString = function toString() {
  return "id: " + this.id + "\n" + "data: " + this.serialize() + "\n\n";
};

module.exports = Event;
