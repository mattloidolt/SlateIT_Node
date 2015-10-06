// handles the various requests related to the user, login, and permissions on the client side

function getLogin(req, res, user) {
	// checks the passed in user to see if the password is valid, and if it has login permissions
	// then sends this informtion, along with the rest of the user info from the DB, back to the client
}

function updateAdmin(req, res, user) {
	// gets the avilable admin options for this user and returns them to the client
}

function updateSystem(req, res, user) {
	// gets the avilable system options for this user and returns them to the client
}

function updateFavorites(req, res, user) {
	// gets the avilable favorites for this user and returns them to the client
}

function updateQuickLinks(req, res, user) {
	// gets the avilable quick links for this user and returns them to the client
}