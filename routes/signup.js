var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['users']);
var User = require('../models/user');

console.log('signup')

// router.post('/', function(req, res) {
//     res.redirect('/signup');
// });

router.get('/', function(req, res) {
    res.render('signup', {
    });
});


router.post('/', function(req, res) {

    req.checkBody('name', 'Title is required').notEmpty();
    req.checkBody('username' , 'Location must be filled in').notEmpty();
    req.checkBody('password', 'Description must be filled in').notEmpty();
    req.checkBody('email'       , 'Price must be filled in').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        db.users.find(function (err, docs) {
            res.render('signup', {
                errors: errors
            });
        });
    } else {
        var newUser = new User(
            req.body.name,
            req.body.username,
            req.body.password,
            req.body.email);
        db.users.insert(newUser);
        console.log(newUser)
        db.users.find(function (err, docs) {
            res.redirect('/rooms')
        });
    }

});

module.exports = router;
