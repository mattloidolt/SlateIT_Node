// handles the various requests for information related to the tableview on the client side

function getTableInfo(req, res, Table) {
	// for getting the table information requested and returning the json for it to the client
}

function getRows(req, res, Table, Rows, startingID) {
	// for getting a set of x rows and returning the json for them to the client
}

function getRow(req, res, Table, previousID) {
	// for getting a single row and returning the json to the client
}

function saveRows(req, res, Table) {
	// saves the incoming rows to the database
}

function getNumRecords(req, res, Table) {
	// simple function to get the number of records in the given table and return it to the client
}