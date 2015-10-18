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
    this.handleRequest(req, res);
});

/* GET handle the request for information */
router.get('/request', function (req, res, next) {
    this.handleRequest(req, res);
});

function handleRequest(req, res, next) {
	var MongoClient = require('mongodb').MongoClient,
		Server = require('mongodb').Server;

	var mongoClient = new MongoClient(new Server("localhost", 27017, { 'native_parser': true }))
	var db = mongoClient('test');
	var myResponseJson;

	mongoClient.open(function (err, mongoClient) {
		if (err) throw err;
		// main function to figure out what type of request this is
		if (req.method === 'GET') {
			if (req.query.Type == "TableInfo") {
				myResponseJson = require('tableRequests').getTable(req, db, next);
			} else if (req.query.Type == "Row") {
				myResponseJson = require('tableRequests').getRow(req, db, next);
			} else if (req.query.Type == "Rows") {
				myResponseJson = require('tableRequests').getRows(req, db, next);
			} else if (req.query.Type == "numRecords") {
				myResponseJson = require('tableRequests').getNumRecords(req, db, next);
			} else if (req.query.Type == "updateAdmin") {
				myResponseJson = require('userRequests').updateAdmin(req, db, next);
			} else if (req.query.Type == "updateSystem") {
				myResponseJson = require('userRequests').updateSystem(req, db, next);
			} else if (req.query.Type == "updateFavorites") {
				myResponseJson = require('userRequests').updateFavorites(req, db, next);
			} else if (req.query.Type == "updateQuickLinks") {
				myResponseJson = require('userRequests').updateQuickLinks(req, db, next);
			} else if (req.query.Type == "login") {
				myResponseJson = require('userRequests').getLogin(req, db, next);
			}
			res.writeHead(200, { 'content-type': 'application/json' });
			res.write(JSON.stringify(myResponseJson));
			res.end('\n');
		} else if (req.method === 'POST') {
			myResponseJson = require('userRequests').getLogin(req, db, next);
		}
	});
}

module.exports = router;