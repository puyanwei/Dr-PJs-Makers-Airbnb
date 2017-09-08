var express = require('express');
var router = express.Router();
var sess;


router.get('/', function(req, res) {
    sess = req.session;
    res.render('welcome', {
        currentUser: sess.currentUser
    });
});

module.exports = router;
