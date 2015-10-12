// This script is to render and control the navigation section at the top of the page
// This script should check permissions before deciding what options are available
// This will also contain the ajax code for the search box

var main = require('main');

function updateUL(Options, ulName) {
	var ul = document.getElementById(ulName);
	var somethingAdded = false;
	for (var option in Options) {
		if (Options[option] != "") {
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.appendChild(document.createTextNode(option["name"]));
			if (option["title"] != "") {
				a.title = option["title"];
			}
			if (option["link"] != "") {
				a.href = option["link"];
			}
			li.appendChild(a);
			ul.appendChild(li);
			somethingAdded = true;
		}
    }
	if (!somethingAdded) {
		$("ul." + ul.id).hide()
	}
}

function updateAll(user) {
	updateAdmin(user);
	updateSystem(user);
	updateFavorites(user);
	updateQuickLinks(user);
}

function updateAdmin(user) {
	// requests from the server the admin options that should be available to this user
	// then updates the admin drop down at the top of the page
	var requestURI = 'Type=updateAdmin&userID=' + user.userID;
	main.get(requestURI, function (res) {
		//var Options = res.Options;
		var Options = {
			"option1": {"name": "Manage Users", "link": "/users"}
		}
		user.adminOptions = Options;
		updateUL(Options, "ddAdmin");
	});
}

function updateSystem(user) {
	// requests from the server the system options that should be available for this user
	// then updates the system drop down at the top of the page
	var requestURI = 'Type=updateSystem&userID=' + user.userID;
	main.get(requestURI, function (res) {
		var Options = res.Options;
		user.systemOptions = Options;
		updateUL(Options, "ddSystem");
	});
}

function updateFavorites(user) {
	// requests from the server the favorites for this user
	// then updates the favorites drop down at the top of the page with this information
	// this should also update the favorites section of the user variable in the login script
	var requestURI = 'Type=updateFavorites&userID=' + user.userID;
	main.get(requestURI, function (res) {
		var Options = res.Options;
		user.favorites = Options;
		updateUL(Options, "ddFavorites");
	});
}

function updateQuickLinks(user) {
	// requests from the server the quick links that should be shown for this site (and this user based on permissions)
	// then updates the quick links drop down at the top of the page with this info
	// this should also update the quick links section of the user variable in the login script
	var requestURI = 'Type=updateQuickLinks&userID=' + user.userID;
	main.get(requestURI, function (res) {
		var Options = res.Options;
		user.quickLinks = Options;
		updateUL(Options, "ddQuickLinks");
	});
}