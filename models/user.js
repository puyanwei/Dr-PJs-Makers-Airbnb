var User = function(name) {
  this.name = name
};

User.prototype.addRoom = function(room = new Room) {
  this.room = room;
};

module.exports = User;
