var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['rooms']);

var express = require('express');
var router = express.Router();
var current_user = null;

router.get('/', function(req, res) {
    db.rooms.find(function (err, docs) {
        console.log(docs);
        res.render('rooms', {
            rooms: docs,
            current_user: current_user
        });
    });
});

router.post('/', function(req, res) {
    res.redirect('/rooms');
});

router.post('/add', function(req, res) {

    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('location' , 'Location must be filled in').notEmpty();
    req.checkBody('description', 'Description must be filled in').notEmpty();
    req.checkBody('price'       , 'Price must be filled in').notEmpty();
    req.checkBody('owner'       , 'Owner must be filled in').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        db.rooms.find(function (err, docs) {
            console.log(docs);
            res.render('index', {
                rooms: docs,
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
        db.rooms.find(function (err, docs) {
            console.log(docs);
            res.render('index', {
                rooms: docs
            });
        });
    }
});

module.exports = router;
