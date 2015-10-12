// This is for the code to handle an incomming data request, get the data, and send the json back to the client
var mongoClient = require('mongodb').MongoClient;

function handleRequest(req, res) {
	// main function to figure out what type of request this is
	if (req.method === 'GET') {
		// connect to the test database on the localhost
		mongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
			if (err) throw err;

			var myResponseJson;
			var tableRequests = require('tableRequests');
			var userRequests = require('userRequests');
			if (req.Type == "TableInfo") {
				myResponseJson = tableRequests.getTable(req, db);
			} else if (req.Type == "Row") {
				myResponseJson = tableRequests.getRow(req, db);
			} else if (req.Type == "Rows") {
				myResponseJson = tableRequests.getRows(req, db);
			} else if (req.Type == "numRecords") {
				myResponseJson = tableRequests.getNumRecords(req, db);
			} else if (req.Type == "Login") {
				myResponseJson = userRequests.getLogin(req, db);
			} else if (req.Type == "updateAdmin") {
				myResponseJson = userRequests.updateAdmin(req, db);
			} else if (req.Type == "updateSystem") {
				myResponseJson = userRequests.updateSystem(req, db);
			} else if (req.Type == "updateFavorites") {
				myResponseJson = userRequests.updateFavorites(req, db);
			} else if (req.Type == "updateQuickLinks") {
				myResponseJson = userRequests.updateQuickLinks(req, db);
			}
			res.writeHead(200, { 'content-type': 'application/json' });
			res.write( JSON.stringify(myResponseJson) );
        	res.end('\n');
		});
	}
}