module.exports = {
    isLoggedIn: function (req, db, next) {
        var session_id = req.cookies.session;
        getUsername(session_id, db, function (err, username) {
            if (!err && username) {
                req.username = username;
            }
            return next({ 'session_id': session_id, 'username': username });
        });
    },

    startSession: function (user, db, callback) {
        var crypto = require('crypto');
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');

        var session = { 'username': user.username, '_id': session_id }

        db.collection("sessions").insert(session, function (err, result) {
            callback(err, user);
        });
    },

    endSession: function (session_id, db, callback) {
        // Remove session document
        db.collection("sessions").remove({ '_id': session_id }, function (err, numRemoved) {
            callback(err);
        });
    }
}

function getUsername(session_id, db, callback) {
    if (!session_id) {
        callback(Error("Session not set"), null);
        return;
    }

    db.collection("sessions").findOne({ '_id': session_id }, function (err, session) {
        if (err) return callback(err, null);
        if (!session) {
            callback(new Error("Session: " + session + " does not exist"), null);
            return;
        }
        callback(null, session.username);
    });
}