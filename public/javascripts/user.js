// this javascript is to handle the session variables and login requests to the server
// This will also be the script that renders the 're-login' pop-up when a session times out
// The check 'check session' should be called for every page in the system

var main = require('main.js');
var sessionTimeout = 0;
// temporary user information filled in for testing
var user = {
	"userID": "1",
	"username": "admin",
	"timezone": "MST",
	"firstname": "",
	"lastname": "",
	"email": "",
	"phone": "",
	"bio": "",
	"permissions": {
		"login": "view",
		"admin": "view",
		"users": "edit",
		"tables": "",
		"account": "",
		"exportdata": "",
		"importdata": ""
	},
	"favorites": {
		"home": ""
	},
	"quicklinks": {
		"quicklink1": ""
	},
	"adminOptions": {
		"Users": "",
		"Permissions": "",
		"CreateTables": "",
		"EditTables": "",
		"SysSettings": ""
	},
	"systemOptions": {
		"Profile": "",
		"LogOff": ""
	},
	"settings": {
		"color": "",
		"timeout": ""
	}
}

function checkSession() {
	// check if the user has not reached the timeout for their session
	// if they have, then renderReLogin and re-set the session variables
}

function renderReLogin() {
	// lock the page and render the 'login' modal on the screen
}

function login(req) {
	// executes the login:
	// 1 - check that username/password is valid and user has 'login permission' (if not, renderReLogin())
	// 2 - update the user information stored here
	// 3 - remove the ReLogin screen that is blocking the background
	var requestURI = 'Type=Login'
	main.get(requestURI, function (res) {
		user = res.user;
		// TODO - remove the ReLogin screen blocking background
	});
}