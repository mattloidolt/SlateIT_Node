var router = require('express').Router();

/* GET login page. */
router.get('/', function(req, res, next) {
    res.render('login', {});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('home', {});
});

/* POST handle the request */
router.post('/request', function (req, res, next) {
    require('requestHandler').handleRequest(req, res);
});

/* GET handle the request for information */
router.get('/request', function (req, res, next) {
    require('requestHandler').handleRequest(req, res);
});

module.exports = router;