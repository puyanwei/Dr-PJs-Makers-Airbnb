var express = require('express');
var router = express.Router();

module.exports = router;

router.post('/', function(req, res) {
    res.redirect('/rooms');
});
