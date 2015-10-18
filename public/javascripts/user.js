// this javascript is to handle the session variables and login requests to the server
// This will also be the script that renders the 're-login' pop-up when a session times out
// The check 'check session' should be called for every page in the system

var user;

function checkSession() {
	// check if the user has not reached the timeout for their session
	// if they have, then renderReLogin and re-set the session variables
}

function userLogin() {
	// executes the login:
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	$.getJSON('/request?Type=logIn&username=' + username + '&password=' + password + '&', function (data) {
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

function getUser() {
	// updates userinformation based on just username
	var username = 'matt'; // later, this will come from the session
	$.getJSON('/request?Type=getUser&username=' + username + '&', function (data) {
		if (typeof data._id == 'undefined') {
			// invalid login, need to say password is wrong
			window.location.replace("/");
		} else {
			// successfully found the user, update the information
			user = data;
		}
	});
}

function checkPermission(permissionStr, ptype) {
	var permission = user.permissions[permissionStr];
	if (typeof permission == 'undefined') {
		return false;
	} else if (permission == "edit") {
		return true;
	} else if (ptype == "view" && permission == "view") {
		return true;
	}
	return false;
}

