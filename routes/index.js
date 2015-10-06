var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/request', function (req, res) {
    // handle the request for information
});

module.exports = router;