// this javascript is to handle the session variables and login requests to the server
// This will also be the script that renders the 're-login' pop-up when a session times out
// The check 'check session' should be called for every page in the system

var sessionTimeout = 0;
// temporary user information filled in for testing
var user = {
	"_id": "1",
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

function userLogin() {
	// executes the login:
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	$.getJSON('/request?Type=login&username=' + username + '&password=' + password + '&', function(data) {
		if (typeof data._id == 'undefined') {
			// invalid login, need to say password is wrong
			window.location.replace("/");
		} else {
			// successful login, store the session information and redirect to the home page
			user = data;
			window.location.replace("/home");
		}
		
	});
	
}