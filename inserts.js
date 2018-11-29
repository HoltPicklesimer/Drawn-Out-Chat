// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});


// Create a user
function postUser(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log("Inserting User " + username);
	console.log("Trying to connect to a database at " + connectionString);
	
	insertUserIntoDb(username, password, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		}
		else
		{
			console.log("Wanting to add: " + req.body.username);
	var result = { status: "success"
							 , entity: {username:username, password:password}
							 };
	res.json(result);
		}
		res.end();
	});
}

// Create a chat room
function postRoom(req, res) {
	var name = req.body.name;
	var admin_id = req.body.adminId;
	console.log("Inserting Chat Room " + name);
	console.log("Trying to connect to a database at " + connectionString);
	insertRoomIntoDb(name, admin_id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		}
	});
	res.end();
}

// Add a user to a chat room
function addUser(req, res) {
	var user_id = req.body.userId;
	var chat_id = req.body.chatId;
	console.log("Inserting User into chat room " + user_id + " into " + chat_id);
	console.log("Trying to connect to a database at " + connectionString);
	addUserToRoomInDb(user_id, chat_id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		}
	});
	res.end();
}

// Create a comment
function postComment(req, res) {
	var chat_id = req.body.chatId;
	var user_id = req.body.userId;
	var content = req.body.content;
	console.log("Inserting comment from " + user_id + " into " + chat_id);
	console.log("Trying to connect to a database at " + connectionString);
	insertCommentIntoDb(chat_id, user_id, content, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		}
	});
	res.end();
}

module.exports = { postUser:postUser, postRoom:postRoom, addUser:addUser, postComment:postComment };

var queries = [
	"INSERT INTO users (username, password) VALUES ($1::varchar, $2::varchar)",
	"INSERT INTO chat_rooms (name, admin_id, image_data) VALUES ($1::varchar, $2::int, '{}')",
	"INSERT INTO chat_users (user_id, chat_id) VALUES ($1::int, $2::int)",
	"INSERT INTO comments (chat_id, user_id, content, date_published) \
	VALUES ($1::int, $2::int, $3::text, current_timestamp)"
];

// Insert a user into the database
function insertUserIntoDb(username, password, callback) {
	var sql = queries[0];
	var params = [username, password];

	console.log("Inserting user now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
	});
}

// Insert a room into the database
function insertRoomIntoDb(name, admin_id, callback) {
	var sql = queries[1];
	var params = [name, admin_id];

	console.log("Inserting room now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
	});
}

// Insert a room into the database
function addUserToRoomInDb(user_id, chat_id, callback) {
	var sql = queries[2];
	var params = [user_id, chat_id];

	console.log("Adding user to room...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
	});
}

// Insert a room into the database
function insertCommentIntoDb(chat_id, user_id, content, callback) {
	var sql = queries[3];
	var params = [chat_id, user_id, content];

	console.log("Inserting comment now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
	});
}