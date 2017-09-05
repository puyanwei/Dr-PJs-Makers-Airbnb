var User = require('../models/user');
var expect = require('chai').expect;

describe('User', function() {
  var user;
  var room;

  beforeEach(function() {
    user = new User();
    room = {
      location: "London",
      description: "This is my lovely room",
      price: "£230"
    }
  });

  it('adds a room location', function() {
    user.addRoom(room);
    expect(user.room.location).to.equal("London");
  });

  it('adds a room description', function() {
    user.addRoom(room);
    expect(user.room.description).to.equal("This is my lovely room");
  });

  it('adds a room price per night', function() {
    user.addRoom(room);
    expect(user.room.price).to.equal("£230");
  });
});
