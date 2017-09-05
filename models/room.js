var Room = function(owner, title, location, description, price) {
  this.title = title;
  this.location = location;
  this.description = description;
  this.price = price;
  this.owner = owner;
};

module.exports = Room;
