var User = function(name) {
  this.name = name

};

User.prototype.addRoom = function(location) {
  this.room = location;
};

module.exports = User;
