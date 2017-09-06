var express = require('express');
var router = express.Router();

console.log('signup')

router.post('/', function(req, res) {
    res.redirect('/signup');
});

router.get('/', function(req, res) {
    res.render('signup', {            
    });
});

module.exports = router;
