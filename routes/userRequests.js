// handles the various requests related to the user, login, and permissions on the client side

function getLogin(req, db, next) {
	// checks the passed in user to see if the password is valid, and if it has login permissions
	// then sends this informtion, along with the rest of the user info from the DB, back to the client
	var username = req.body.username;
	var password = req.body.password;
	if (typeof username == 'undefined') {
		next(Error("No Username Sent"));
	} else if (typeof password == 'undefined') {
		next(Error("No Password Sent"));
	} else {
		db.collection('users').findOne({ "username": username, "password": password}, function (err, doc) {
			db.close();
			if (err) throw err;
			return doc;
		});
	}
}

function updateAdmin(req, db, next) {
	// gets the available admin options for this user and returns them to the client
	var userID = req.userID;
	db.collection('users').findOne({ "_id": userID}, function (err, doc) {
		if (err) throw err;

		// RETURN THE ADMIN OPTIONS FOR THIS USER

		db.close();
	});
}

function updateSystem(req, db, next) {
	// gets the avilable system options for this user and returns them to the client
}

function updateFavorites(req, db, next) {
	// gets the avilable favorites for this user and returns them to the client
}

function updateQuickLinks(req, db, next) {
	// gets the avilable quick links for this user and returns them to the client
}