var router = require('express').Router();

/* GET login page. */
router.get('/', function(req, res) {
    res.render('login', {});
});

/* GET home page. */
router.get('/home', function(req, res) {
    res.render('home', {});
});

/* handle the request for information */
router.get('/request', function (req, res) {
    var requestHandle = require('requestHandler');
    requestHandle.handleRequest(req, res);
});

module.exports = router;