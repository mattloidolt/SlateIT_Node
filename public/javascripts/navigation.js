// This script is to render and control the navigation section at the top of the page
// This script should check permissions before deciding what options are available
// This will also contain the ajax code for the search box

var main = require('main');

function updateAdmin(user) {
	// requests from the server the admin options that should be available to this user
	// then updates the admin drop down at the top of the page
	var requestURI = 'Type=updateAdmin&userID=' + user.userID;
	main.get(requestURI, function (res) {
		user.adminOptions = res.Options;
	});
}

function updateSystem(user) {
	// requests from the server the system options that should be available for this user
	// then updates the system drop down at the top of the page
	var requestURI = 'Type=updateSystem&userID=' + user.userID;
	main.get(requestURI, function (res) {
		user.systemOptions = res.options;
	});
}

function updateFavorites(user) {
	// requests from the server the favorites for this user
	// then updates the favorites drop down at the top of the page with this information
	// this should also update the favorites section of the user variable in the login script
	var requestURI = 'Type=updateFavorites&userID=' + user.userID;
	main.get(requestURI, function (res) {
		user.favorites = res.options;
	});
}

function updateQuickLinks(user) {
	// requests from the server the quick links that should be shown for this site (and this user based on permissions)
	// then updates the quick links drop down at the top of the page with this info
	// this should also update the quick links section of the user variable in the login script
	var requestURI = 'Type=updateQuickLinks&userID=' + user.userID;
	main.get(requestURI, function (res) {
		user.quickLinks = res.options;
	});
}