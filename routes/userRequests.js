// handles the various requests related to the user, login, and permissions on the client side

module.exports = {
	getLogin: function (req, db, next, cb) {
		// checks the passed in user to see if the password is valid, and if it has login permissions
		// then sends this informtion, along with the rest of the user info from the DB, back to the client
		var username = ((typeof req.body.username == 'undefined') ? req.query.username : req.body.username);
		var password = ((typeof req.body.password == 'undefined') ? req.query.password : req.body.username);
		if (typeof username == 'undefined') {
			next(Error("No Username Sent"));
		} else if (typeof password == 'undefined') {
			next(Error("No Password Sent"));
		} else {
			db.collection('users').findOne({ "username": username, "password": password }, function (err, doc) {
				if (err) throw err;
				doc["password"] = null;
				delete doc["password"];
				cb(doc);
			});
		}
	},
	
	getUserInfo: function (req, db, next, cb) {
		// checks the passed in user to see if the password is valid, and if it has login permissions
		// then sends this informtion, along with the rest of the user info from the DB, back to the client
		var username = ((typeof req.body.username == 'undefined') ? req.query.username : req.body.username);
		if (typeof username == 'undefined') {
			next(Error("No Username Sent"));
		} else {
			db.collection('users').findOne({ "username": username}, function (err, doc) {
				if (err) throw err;
				cb(doc);
			});
		}
	}
};