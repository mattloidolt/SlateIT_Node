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
		var reqType = ((typeof req.body.Type == 'undefined') ? req.query.Type : req.body.Type);
		// main function to figure out what type of request this is
		var userRequests = require('./userRequests');
		var tableRequests = require('./tableRequests');
		var sessionHandler = require('./sessionHandler');
		switch (reqType) {
			case "getSession":
				sessionHandler.isLoggedIn(req, db, function (myResponseJson) {
					db.close();
					res.json(myResponseJson);
				});
				break;
			case "getAutoCompleteTables":
				tableRequests.getAutoCompleteTables(req, db, function (myResponseJson) {
					db.close();
					res.json(myResponseJson);
				});
				break;
			case "logIn":
				userRequests.getLogin(req, sessionHandler, db, function (myResponseJson) {
					db.close();
					res.json(myResponseJson);
				});
				break;
			case "logOut":
				sessionHandler.endSession(req.cookies.session, db, function (myResponseJson) {
					db.close();
				});
				break;
			case "getUser":
				userRequests.getUserInfo(req, db, function (myResponseJson) {
					db.close();
					res.json(myResponseJson);
				});
				break;
			case "getTable":
				tableRequests.getTableInfo(req, db, function (myResponseJson) {
					db.close();
					res.json(myResponseJson);
				});
				break;
			case "getRows":
				tableRequests.getRows(req, db, function (myResponseJson) {
					db.close();
					res.json(myResponseJson);
				});
				break;
		}
	});
}

module.exports = router;