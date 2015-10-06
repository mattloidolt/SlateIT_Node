// handles the various requests related to the user, login, and permissions on the client side

function getLogin(req, conn) {
	// checks the passed in user to see if the password is valid, and if it has login permissions
	// then sends this informtion, along with the rest of the user info from the DB, back to the client
}

function updateAdmin(req, conn) {
	// gets the avilable admin options for this user and returns them to the client
}

function updateSystem(req, conn) {
	// gets the avilable system options for this user and returns them to the client
}

function updateFavorites(req, conn) {
	// gets the avilable favorites for this user and returns them to the client
}

function updateQuickLinks(req, conn) {
	// gets the avilable quick links for this user and returns them to the client
}