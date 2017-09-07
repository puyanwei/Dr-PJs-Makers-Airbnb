var User = function(name, username, password, email) {
  this.name = name;
  this.username = username;
  this.password = password;
  this.email = email;
};

User.prototype.addRoom = function(room) {
  this.room = room;
};

module.exports = User;
