var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('makersbnb', ['users']);

module.exports = router;

router.post('/', function(req, res) {
    res.redirect('/rooms');
});
