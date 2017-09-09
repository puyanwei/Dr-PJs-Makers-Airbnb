var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['rooms','users']);
var Room = require('../models/room');
var express = require('express');
var router = express.Router();
var session = require('express-session');
var ObjectId = require('mongodb').ObjectID;

var sess;

router.get('/', function(req, res) {
    sess = req.session;
    db.rooms.find(function (err, docs) {
        res.render('rooms', {
            rooms: docs,
            currentUser: sess.currentUser
        });
    });
});

router.post('/', function(req, res) {
    sess = req.session;
    db.rooms.find(function (err, docs) {
      res.render('rooms', {
          rooms: docs,
          currentUser: sess.currentUser
      });
    });
});

router.post('/book', function(req, res) {
  sess = req.session;
    var room;
    db.rooms.find(function (err, docs) {
      docs.forEach(function(thisRoom) {
        if (thisRoom.title === req.body.roomName) {
          room = thisRoom
        }
      });
      console.log('hello');
      console.log(room.startDate);
      console.log(room.endDate);
        res.render('book', {
            room: room,
            currentUser: req.currentUser
        });
    });
});

router.post('/unbook', function(req, res) {
    sess = req.session;
    db.rooms.update({_id: ObjectId(req.body.unbookRoomID)}, {$set : {booked : false}});
    res.redirect('/rooms');
});


router.post('/confirm', function(req, res) {
    console.log(req.body.roomName);
    db.rooms.update({title : req.body.bookRoomName}, {$set : {booked : true}});
    res.redirect('/rooms');
});

router.get('/add', function(req, res){
    sess = req.session;

    var errors = req.validationErrors();

    if (errors) {
        db.rooms.find(function (err, docs) {
            res.render('add', {
                currentUser: sess.currentUser,
                errors: errors
            });
        });
    } else {
        var newRoom = new Room(sess.currentUser,
            req.body.title,
            req.body.location,
            req.body.description,
            req.body.price,
            req.body.startDate,
            req.body.endDate);
        db.rooms.insert(newRoom);
        res.redirect('/rooms')
    }
});

router.post('/add', function(req, res) {
    sess = req.session;

    req.checkBody('title'      , 'Title is required').notEmpty();
    req.checkBody('location'   , 'Location must be filled in').notEmpty();
    req.checkBody('description', 'Description must be filled in').notEmpty();
    req.checkBody('price'      , 'Price must be filled in').notEmpty();
    req.checkBody('startDate'  , 'Start date must be filled in').notEmpty();
    req.checkBody('endDate'    , 'End date must be filled in').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        db.rooms.find(function (err, docs) {
            res.render('add', {
                currentUser: sess.currentUser,
                errors: errors
            });
        });
    } else {
        console.log(req.body.startDate);
        console.log(req.body.endDate);
        var newRoom = new Room(sess.currentUser,
            req.body.title,
            req.body.location,
            req.body.description,
            req.body.price,
            req.body.startDate,
            req.body.endDate);
        db.rooms.insert(newRoom);
        res.redirect('/rooms')
    }

});

router.post('/delete', function(req, res) {
    db.rooms.remove({_id : ObjectId(req.body.unbookRoomID)});
    res.redirect('/rooms');
});

module.exports = router;
