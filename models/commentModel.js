// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});

var queries = [
	"SELECT id, chat_id, user_id, content, date_published FROM comments WHERE id = $1::int",
	"INSERT INTO comments (chat_id, user_id, content, date_published) VALUES ($1::int, $2::int, $3::text, current_timestamp)",
	"DELETE FROM comments WHERE id = $1::int;"
];

// Get a comment from the database
function getCommentFromDb(id, callback) {
	var sql = queries[0];
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

// Insert a room into the database
function insertCommentIntoDb(chat_id, user_id, content, callback) {
	var sql = queries[1];
	var params = [chat_id, user_id, content];

	console.log("Inserting comment now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			console.log("Inserted Comment from user with id " + user_id + ", added to room with id " + chat_id);
			callback(null);
		}

	});
}

// Delete a comment from the database
function deleteCommentFromDb(id, callback) {
	var sql = queries[2];
	var params = [id];

	console.log("Deleting Comment Now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			console.log("Removed Comment with id " + id);
			callback(null);
		}

	});
}