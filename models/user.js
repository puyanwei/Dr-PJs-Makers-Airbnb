var User = function(name) {
  this.name = name;
};

User.prototype.addRoom = function(room) {
  this.room = room;
};

module.exports = User;
