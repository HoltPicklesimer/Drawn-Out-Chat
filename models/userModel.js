// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});

var queries = [
	"SELECT id, username, password FROM users WHERE id = $1::int",
	"SELECT id, username, password FROM users WHERE username = $1::varchar AND password = $2::varchar",
	"SELECT c.id, c.name, c.admin_id, c.image_data FROM chat_rooms c JOIN chat_users cu ON c.id = cu.chat_id JOIN users u ON u.id = cu.user_id WHERE u.id = $1::int ORDER BY c.id",
	"INSERT INTO users (username, password) VALUES ($1::varchar, $2::varchar)",
	"SELECT u.id, u.username FROM users u JOIN chat_users cu WHERE u.id != cu.admin_id AND UPPER(u.username) LIKE CONCAT('%', UPPER($1::varchar), '%')"
];

// Get a user from the database by id
function getUserFromDbById(id, callback) {
	var sql = queries[0];
	var params = [id];

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

// Get a user from the database by info
function getUserFromDbByInfo(username, password, callback) {
	var sql = queries[1];
	var params = [username, password];

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
	var sql = queries[2];
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

// Insert a user into the database
function insertUserIntoDb(username, password, callback) {
	var sql = queries[3];
	var params = [username, password];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			console.log("User successfully added with username " + username + " and password " + password);
			callback(null);
		}

	});
}

// Get users with usernames containing item
function searchUsers(item, callback) {
	var sql = queries[4];
	var params = [item];

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

module.exports = { getUserFromDbById:getUserFromDbById, getUserFromDbByInfo:getUserFromDbByInfo, getUserRoomsFromDb:getUserRoomsFromDb,
									 insertUserIntoDb:insertUserIntoDb, searchUsers:searchUsers };