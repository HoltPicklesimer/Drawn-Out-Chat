// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});

module.exports = {
// Get a user
getUser: function getUser(req, res) {
	console.log("Getting User " + req.query.id);
	var id = req.query.id;
	var username = req.query.username;
	var password = req.query.password;
	console.log("Trying to connect to a database at " + connectionString);
	getUserFromDb(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var user = result[0];
			res.status(200).json(result[0]);
		}
	});
},

// Get a chat room
getChatRoom: function getChatRoom(req, res) {
	console.log("Getting Chat Room " + req.query.id);
	var id = req.query.id;
	console.log("Trying to connect to a database at " + connectionString);
	getRoomFromDb(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var room = result[0];
			res.status(200).json(result[0]);
		}
	});
},

// Get the chat rooms of a user
getUserRooms: function getUserRooms(req, res) {
	console.log("Getting Chat Rooms of User " + req.query.id);
	var id = req.query.id;
	console.log("Trying to connect to a database at " + connectionString);
	getUserRoomsFromDb(id, function (error, result) {
		if (error || result == null) {
			res.status(500).json({success:false, data:error});
		} else {
			var rooms = result;
			res.status(200).json(result);
		}
	});
},

// Get the users of a chat room
getChatUsers: function getChatUsers(req, res) {
	console.log("Getting Users of a Chat Room " + req.query.id);
	var id = req.query.id;
	console.log("Trying to connect to a database at " + connectionString);
	getChatUsersFromDb(id, function (error, result) {
		if (error || result == null) {
			res.status(500).json({success:false, data:error});
		} else {
			var rooms = result;
			res.status(200).json(result);
		}
	});
},

// Get a comment
getComment: function getComment(req, res) {
	console.log("Getting Comment " + req.query.id);
	var id = req.query.id;
	console.log("Trying to connect to a database at " + connectionString);
	getCommentFromDb(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var room = result[0];
			res.status(200).json(result[0]);
		}
	});
},

// Get the comments in a chat room
getRoomComments: function getRoomComments(req, res) {
	console.log("Getting Comments of Chat Room " + req.query.id);
	var id = req.query.id;
	console.log("Trying to connect to a database at " + connectionString);
	getRoomCommentsFromDb(id, function (error, result) {
		if (error || result == null) {
			res.status(500).json({success:false, data:error});
		} else {
			var rooms = result;
			res.status(200).json(result);
		}
	});
}
}

var queries = [
	"SELECT id, username, password FROM users WHERE id = $1::int",
	"SELECT id, username, password FROM users WHERE username = $1::varchar AND password = $2::varchar",
	"SELECT id, name, admin_id, image_data FROM chat_rooms WHERE id = $1::int",
	"SELECT id, user_id, chat_id FROM chat_users WHERE user_id = $1::int",
	"SELECT id, user_id, chat_id FROM chat_users WHERE chat_id = $1::int",
	"SELECT id, chat_id, user_id, content, date_published FROM comments WHERE id = $1::int",
	"SELECT id, chat_id, user_id, content, date_published FROM comments WHERE chat_id = $1 ORDER BY date_published DESC"
];

// Get a user from the database
function getUserFromDb(id, username, password, callback) {
	var sql = queries[0];
	var params;
	if (username && password)
	{
		sql = queries[1];
		params = [username, password];
	}
	else
		params = [id];

	console.log("Getting user now, id = " + id + " " + username + " " + password);

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}

// Get a chat room from the database
function getRoomFromDb(id, callback) {
	var sql = queries[2];
	var params = [id];

	console.log("Getting chat room now, id = " + id);

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}

// Get chat rooms of a user from the database
function getUserRoomsFromDb(id, callback) {
	var sql = queries[3];
	var params = [id];

	console.log("Getting chat rooms now, user id = " + id);

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}

// Get chat rooms of a user from the database
function getChatUsersFromDb(id, callback) {
	var sql = queries[4];
	var params = [id];

	console.log("Getting users now, chat room id = " + id);

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}

// Get a comment from the database
function getCommentFromDb(id, callback) {
	var sql = queries[5];
	var params = [id];

	console.log("Getting comment now, id = " + id);

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}

// Get chat rooms of a user from the database
function getRoomCommentsFromDb(id, callback) {
	var sql = queries[5];
	var params = [id];

	console.log("Getting comments now, chat room id = " + id);

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}