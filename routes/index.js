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

/* handle the unrecognized routes */
router.get('*', function (req, res) {
    res.render('error', { "error": {"status": "404", "stack": "Page Not Found"}});
});

module.exports = router;