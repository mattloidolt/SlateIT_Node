var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Express' });
});

/* GET home page. */
router.get('/home', function(req, res) {
    res.render('home', { title: 'Express' });
});

/* handle the request for information */
router.get('/request', function (req, res) {
    var requestHandle = require('requestHandler');
    requestHandle.handleRequest(req, res);
});

module.exports = router;