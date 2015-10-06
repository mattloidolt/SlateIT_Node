// This is for the code to handle an incomming data request, get the data, and send the json back to the client
var mongoConn = require('mongodb');

function handleRequest(req, res) {
	// main function to figure out what type of request this is
	if (req.method === 'GET') {
		var myResponseJson;
		var tableRequests = require('tableRequests');
		var userRequests = require('userRequests');
		if (req.Type == "TableInfo") {
			myResponseJson = tableRequests.getTable(req, mongoConn);
		} else if (req.Type == "Row") {
			myResponseJson = tableRequests.getRow(req, mongoConn);
		} else if (req.Type == "Rows") {
			myResponseJson = tableRequests.getRows(req, mongoConn);
		} else if (req.Type == "numRecords") {
			myResponseJson = tableRequests.getNumRecords(req, mongoConn);
		} else if (req.Type == "Login") {
			myResponseJson = userRequests.getLogin(req, mongoConn);
		} else if (req.Type == "updateAdmin") {
			myResponseJson = userRequests.updateAdmin(req, mongoConn);
		} else if (req.Type == "updateSystem") {
			myResponseJson = userRequests.updateSystem(req, mongoConn);
		} else if (req.Type == "updateFavorites") {
			myResponseJson = userRequests.updateFavorites(req, mongoConn);
		} else if (req.Type == "updateQuickLinks") {
			myResponseJson = userRequests.updateQuickLinks(req, mongoConn);
		}
		res.writeHead(200, { 'content-type': 'application/json' });
		res.write( JSON.stringify(myResponseJson) );
        res.end('\n');
	}
}