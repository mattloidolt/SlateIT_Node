// handles the various requests for information related to the tableview on the client side

module.exports = {
	getTableInfo: function (req, db, next, cb) {
		// for getting the table information requested and returning the json for it to the client
		var tableName = ((typeof req.body.table == 'undefined') ? req.query.table : req.body.table);
		db.collection('tables').findOne({ "tablename": tableName }, function (err, doc) {
			if (err) throw err;
			cb(doc);
		});
	},

	getRows: function (req, db, next, cb) {
		// for getting a set of x rows and returning the json for them to the client
		var tableName = ((typeof req.body.table == 'undefined') ? req.query.table : req.body.table);
		db.collection(tableName).find({}).toArray(function (err, docs) {
			cb(docs);
		});
	}
}



function getNumRecords(req, db, next) {
	// simple function to get the number of records in the given table and return it to the client
}