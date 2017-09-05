var User = function (name){
  this.name = name

};

User.prototype.addRoom = function(roomName){
  this.room = roomName;
};

module.exports = User;
