// scripts for the profile page
// profile page should allow the user to add an Avitar image, change background colors, edit favorites, and edit their information

$("#favorites").click(function (e){
	var tablename =  document.getElementById("#tablename");
});

function saveAvitar(req, res) {
	// sends the new Avitar image to the server to be saved
}

function changeBGColor(req, res) {
	// changes their system theme color, and saves this setting to the server
	// also updates the 'themecolor' varable on the user
}

function editFavorites(req, res) {
	// saves the new favorites changes to the server
	// also updates the favorites in the user variable
}

function editUserInformation(req, res) {
	// saves the changes to the user info to the server
	// also updates this information in the user variable
	// this includes firstname, lastname, bio, phone, email, etc.
}