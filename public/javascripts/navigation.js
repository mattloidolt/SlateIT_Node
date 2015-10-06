// This script is to render and control the navigation section at the top of the page
// This script should check permissions before deciding what options are available
// This will also contain the ajax code for the search box

var main = require('main');

function updateAdmin(req, userID) {
	// requests from the server the admin options that should be available to this user
	// then updates the admin drop down at the top of the page
	var requestURI = 'Type=updateAdmin&userID=' + userID;
	main.get(requestURI, function (res) {
		var adminOptions = res.Options;
	});
}

function updateSystem(req, userID) {
	// requests from the server the system options that should be available for this user
	// then updates the system drop down at the top of the page
	var requestURI = 'Type=updateSystem&userID=' + userID;
	main.get(requestURI, function (res) {
		var systemOptions = res.options;
	});
}

function updateFavorites(req, userID) {
	// requests from the server the favorites for this user
	// then updates the favorites drop down at the top of the page with this information
	// this should also update the favorites section of the user variable in the login script
	var requestURI = 'Type=updateFavorites&userID=' + userID;
	main.get(requestURI, function (res) {
		var favorites = res.options;
	});
}

function updateQuickLinks(req, user) {
	// requests from the server the quick links that should be shown for this site (and this user based on permissions)
	// then updates the quick links drop down at the top of the page with this info
	// this should also update the quick links section of the user variable in the login script
	var requestURI = 'Type=updateQuickLinks&userID=' + userID;
	main.get(requestURI, function (res) {
		var quickLinks = res.options;
	});
}