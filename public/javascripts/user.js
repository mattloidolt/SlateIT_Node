// this javascript is to handle the session variables and login requests to the server
// This will also be the script that renders the 're-login' pop-up when a session times out
// The check 'check session' should be called for every page in the system

var sessionTimeout = 0;
var user =
	{
		"username": "admin",
		"timezone": "MST",
		"themecolor": "none",
		"firstname": "admin",
		"lastname": "",
		"email": "",
		"phone": "",
		"bio": "",
		"permissions": {
			"login": "edit",
			"admin": "edit",
			"users": "edit",
			"tables": "edit",
			"account": "edit",
			"exportdata": "edit",
			"importdata": "edit"
		},
		"favorites": {
			"home": "home"
		},
		"quicklinks": {
			"quicklink1": "quicklink1"
		}
	}

function checkSession(req, res) {
	// check if the user has not reached the timeout for their session
	// if they have, then renderReLogin and re-set the session variables
}

function renderReLogin(req, res) {
	// lock the page and render the 'login' modal on the screen
}

function login(req, res) {
	// executes the login:
	// 1 - check that username/password is valid and user has 'login permission' (if not, renderReLogin())
	// 2 - update the user information stored here
	// 3 - remove the ReLogin screen that is blocking the background
}