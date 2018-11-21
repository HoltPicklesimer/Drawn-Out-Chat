const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");

const pool = new Pool({connectionString: connectionString});

// Set up the static and views directories
app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, 'views'));

// Set the port
app.set('port', (process.env.PORT || 5000));

// Listen on the port
app.listen(app.get('port'), function(req, res){
	console.log("Listening on port " + app.get('port'));
});

app.get("/getUser", getUser);
app.get("/getChatRoom", getChatRoom);

// Get a user
function getUser(req, res) {
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
}

// Get a chat room
function getChatRoom(req, res) {
	console.log("Getting Chat Room " + req.query.id);
	var id = req.query.id;
	console.log("Trying to connect to a database at " + connectionString);
	getRoomFromDb(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var user = result[0];
			res.status(200).json(result[0]);
		}
	});
}

var queries = [
	"SELECT id, username, password FROM users WHERE id = $1::int",
	"SELECT id, username, password FROM users WHERE username = $1::varchar AND password = $2::varchar",
	"SELECT id, name, admin_id, image_data FROM chat_rooms WHERE id = $1::int",
	"SELECT id, user_id, chat_id FROM chat_users WHERE id = $1::int",
	"SELECT id, user_id, chat_id FROM chat_users WHERE user_id = $1::int AND chat_id = $2::int",
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