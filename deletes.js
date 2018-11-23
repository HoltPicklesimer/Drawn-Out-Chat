// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});

module.exports = {
// Remove a user from a chat room
removeUserFromRoom: function removeUserFromRoom(req, res) {
	var user_id = req.body.userId;
	var chat_id = req.body.chatId;
	console.log("Removing user of id " + user_id + " from room with id " + chat_id);
	console.log("Trying to connect to a database at " + connectionString);
	removeUserInDb(user_id, chat_id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		}
	});
},

// Delete a comment
deleteComment: function deleteComment(req, res) {
	var id = req.body.id;
	console.log("Removing comment of id " + id);
	console.log("Trying to connect to a database at " + connectionString);
	deleteCommentFromDb(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		}
	});
}

}

var queries = [
	"DELETE FROM chat_users WHERE user_id = $1::int AND chat_id = $2::int",
	"DELETE FROM comments WHERE id = $1::int;"
];

// Remove the user from the chat room in the database
function removeUserInDb(user_id, chat_id, callback) {
	var sql = queries[0];
	var params = [user_id, chat_id];

	console.log("Removing User From Chat Room Now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
	});
}

// Delete a comment from the database
function deleteCommentFromDb(id, callback) {
	var sql = queries[1];
	var params = [id];

	console.log("Deleting Comment Now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
	});
}