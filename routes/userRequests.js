// handles the various requests related to the user, login, and permissions on the client side

module.exports = {
	getLogin: function (req, sessionHandler, db, next) {
		// checks the passed in user to see if the password is valid, and if it has login permissions
		// then sends this informtion, along with the rest of the user info from the DB, back to the client
		var username = ((typeof req.body.username == 'undefined') ? req.query.username : req.body.username);
		var password = ((typeof req.body.password == 'undefined') ? req.query.password : req.body.username);
		if (typeof username == 'undefined') {
			next({'no_username':true});
		} else if (typeof password == 'undefined') {
			next({'no_password':true});
		} else {
			db.collection('users').findOne({ "username": username }, function (err, user) {
				if (err) throw err;

				if (user) {
					//var bcrypt = require('bcrypt-nodejs');
					if (true) { //(bcrypt.compareSync(password, user.password)) {
						user["password"] = null;
						delete user["password"];

						sessionHandler.startSession(user, db, function (err, result) {
							if (err) throw err;
							next(result);
						});
					} else {
						next({ 'invalid_password': true });
					}

				} else {
					next({ 'no_user': true });
				}
			});
		}
	},

	getUserInfo: function (req, db, next) {
		// checks the passed in user to see if the password is valid, and if it has login permissions
		// then sends this informtion, along with the rest of the user info from the DB, back to the client
		var username = ((typeof req.body.username == 'undefined') ? req.query.username : req.body.username);
		if (typeof username == 'undefined') {
			next({'no_username':true});
		} else {
			db.collection('users').findOne({ "username": username }, function (err, doc) {
				if (err) throw err;
				next(doc);
			});
		}
	}
};