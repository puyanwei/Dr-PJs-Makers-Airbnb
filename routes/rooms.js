var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['rooms','users']);
var Room = require('../models/room');

var express = require('express');
var router = express.Router();
var currentUser = null;
var session = require('express-session');


var usersDB;
db.users.find(function (err,docs) {
  usersDB = docs;
});

var sess;

router.get('/', function(req, res, next) {
    sess = req.session;

      db.rooms.find(function (err, docs) {
        db.users.find(function (err,docs) {
          usersDB = docs;
          console.log(usersDB);
          next()
        });
        // console.log(docs);
        res.render('rooms', {
            rooms: docs,
            currentUser: sess.currentUser
        });
    });
});

router.post('/', function(req, res, next) {


    db.rooms.find(function (err, docs) {
      db.users.find(function (err,docs) {
        usersDB = docs;
        console.log(usersDB);
        next()
      });
      // console.log(docs);
      res.render('rooms', {
          rooms: docs,
          currentUser: sess.currentUser
      });
  });
});

router.post('/book', function(req, res) {
  sess = req.session;

  var roomname1 = req.body.roomName;
    var room;
    db.rooms.find(function (err, docs) {
      docs.forEach(function(thisRoom) {
        if (thisRoom.title === req.body.roomName) {
          room = thisRoom
        }
      })
        res.render('book', {
            room: room,
            currentUser: req.currentUser
        });
    });


});

router.post('/confirm', function(req, res) {

    console.log(req.body.roomName);
    db.rooms.update({title : req.body.roomName}, {$set : {booked : true}});
    // console.log(db.rooms.find({title : req.body.roomName}));

    res.redirect('/rooms');
});

router.get('/add', function(req, res){
    res.render('add')
})

router.post('/add', function(req, res) {

    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('location' , 'Location must be filled in').notEmpty();
    req.checkBody('description', 'Description must be filled in').notEmpty();
    req.checkBody('price'       , 'Price must be filled in').notEmpty();
    req.checkBody('owner'       , 'Owner must be filled in').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        db.rooms.find(function (err, docs) {
            res.render('add', {
                currentUser: sess.currentUser,
                errors: errors
            });
        });
    } else {
        var newRoom = new Room(req.body.owner,
            req.body.title,
            req.body.location,
            req.body.description,
            req.body.price);
        db.rooms.insert(newRoom);
        res.redirect('/rooms')
    }

});

module.exports = router;
