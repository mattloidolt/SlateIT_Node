var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

/* handle the request for information */
router.get('/request', function (req, res) {
    var requestHandle = require('requestHandler');
    requestHandle.handleRequest(req, res);
});

module.exports = router;