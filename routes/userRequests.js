// handles the various requests related to the user, login, and permissions on the client side

function getLogin(req, db) {
	// checks the passed in user to see if the password is valid, and if it has login permissions
	// then sends this informtion, along with the rest of the user info from the DB, back to the client
	var username = req.username;
	var password = req.password;
	db.collection('users').findOne({ "username": username, "password": password}, function (err, doc) {
		if (err) throw err;

		// DO SOMETHING TO SEE IF A USER WAS RETURNED

		db.close();
	});
}

function updateAdmin(req, db) {
	// gets the available admin options for this user and returns them to the client
	var userID = req.userID;
	db.collection('users').findOne({ "_id": userID}, function (err, doc) {
		if (err) throw err;

		// RETURN THE ADMIN OPTIONS FOR THIS USER

		db.close();
	});
}

function updateSystem(req, db) {
	// gets the avilable system options for this user and returns them to the client
}

function updateFavorites(req, db) {
	// gets the avilable favorites for this user and returns them to the client
}

function updateQuickLinks(req, db) {
	// gets the avilable quick links for this user and returns them to the client
}