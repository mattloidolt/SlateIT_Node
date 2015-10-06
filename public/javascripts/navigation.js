// This script is to render and control the navigation section at the top of the page
// This script should check permissions before deciding what options are available
// This will also contain the ajax code for the search box

function updateAdmin(req, res) {
	// requests from the server the admin options that should be available to this user
	// then updates the admin drop down at the top of the page
}

function updateSystem(req, res) {
	// requests from the server the system options that should be available for this user
	// then updates the system drop down at the top of the page
}

function updateFavorites(req, res) {
	// requests from the server the favorites for this user
	// then updates the favorites drop down at the top of the page with this information
	// this should also update the favorites section of the user variable in the login script
}

function updateQuickLinks(req, res) {
	// requests from the server the quick links that should be shown for this site (and this user based on permissions)
	// then updates the quick links drop down at the top of the page with this info
	// this should also update the quick links section of the user variable in the login script
}