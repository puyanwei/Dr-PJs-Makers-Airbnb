var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['users']);
var User = require('../models/user');
var session = require('express-session');
var signUpError = undefined;

var sess;

router.get('/', function(req, res){
    sess = req.session;

    console.log(sess.currentUser + 'current user');

    if (sess.currentUser === undefined) {
        res.render('signup', {
            currentUser: sess.currentUser
        });
    } else {
            res.send('Already signed in')
    }
});



router.post('/', function(req, res) {
    sess = req.session;
    signUpError = undefined;


    req.checkBody('name'     , 'Name is required').notEmpty();
    req.checkBody('username' , 'Username must be filled in').notEmpty();
    req.checkBody('password' , 'Password must be filled in').notEmpty();
    req.checkBody('email'    , 'Email must be filled in').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        db.users.find(function (err, docs) {
            res.render('signup', {
                errors: errors,
                currentUser: sess.currentUser,
                signUpError: signUpError
            });
        });
    } else {
        var newUser = new User(
            req.body.name,
            req.body.username,
            req.body.password,
            req.body.email);
        db.users.insert(newUser);
        console.log(newUser);
        sess.currentUser = newUser;
        console.log(sess.currentUser.name + 'is current user');
        res.redirect('/rooms');
        // db.rooms.find(function (err, docs) {
        //     res.render('rooms', {
        //         rooms: docs,
        //         currentUser: sess.currentUser
        //     });
        // });
    }

});

module.exports = router;
