var Room = function(owner, title, location, description, price, startDate, endDate) {
  this.title = title;
  this.location = location;
  this.description = description;
  this.price = price;
  this.owner = owner;
  this.startDate = startDate;
  this.endDate = endDate;
  this.booked = false
};

module.exports = Room;


Room.prototype.isBooked = function() {
  return this.booked
}

Room.prototype.book = function() {
    this.booked = true
}