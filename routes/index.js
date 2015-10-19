var router = require('express').Router();

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('login', {});
});

/* GET home page. */
router.get('/home', function (req, res, next) {
    res.render('home', {});
});

/* POST handle the request */
router.post('/request', function (req, res, next) {
    handleRequest(req, res, next);
});

/* GET handle the request for information */
router.get('/request', function (req, res, next) {
    handleRequest(req, res, next);
});

var handleRequest = function (req, res, next) {
	var MongoClient = require('mongodb').MongoClient;
	var connectionurl = 'mongodb://localhost:27017/Slate';

	MongoClient.connect(connectionurl, function (err, db) {
		if (err) throw err;
		// main function to figure out what type of request this is
		if (req.method === 'GET') {
			var userRequests = require('./userRequests');
			var tableRequests = require('./tableRequests');
			switch (req.query.Type) {
				case "getTableNames":
					tableRequests.getTableNames(req, db, next, function (myResponseJson) {
						db.close();
						res.json(myResponseJson);
					});
					break;
				case "logIn":
					userRequests.getLogin(req, db, next, function (myResponseJson) {
						db.close();
						res.json(myResponseJson);
					});
					break;
				case "getUser":
					userRequests.getUserInfo(req, db, next, function (myResponseJson) {
						db.close();
						res.json(myResponseJson);
					});
					break;
				case "getTable":
					tableRequests.getTableInfo(req, db, next, function (myResponseJson) {
						db.close();
						res.json(myResponseJson);
					});
					break;
				case "getRows":
					tableRequests.getRows(req, db, next, function (myResponseJson) {
						db.close();
						res.json(myResponseJson);
					});
					break;
			}
		} else if (req.method === 'POST') {

		}
	});
}

module.exports = router;