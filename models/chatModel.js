// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});

var queries = [
	"SELECT c.id, c.name, c.admin_id, c.image_data, u.username FROM chat_rooms c JOIN users u ON u.id = c.admin_id WHERE c.id = $1::int",
	"SELECT cu.id, cu.user_id, cu.chat_id, u.username FROM chat_users cu JOIN users u ON u.id = cu.user_id WHERE cu.chat_id = $1::int",
	"SELECT c.id, c.chat_id, c.user_id, c.content, c.date_published, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.chat_id = $1 ORDER BY c.date_published DESC",
	"INSERT INTO chat_rooms (name, admin_id, image_data) VALUES ($1::varchar, $2::int, '{\"clickX\":[],\"clickY\":[],\"clickDrag\":[],\"clickColor\":[],\"clickSize\":[]}') RETURNING id",
	"INSERT INTO chat_users (user_id, chat_id) VALUES ($1::int, $2::int)", 
	"UPDATE chat_rooms SET image_data = $2::text WHERE id = $1::int",
	"DELETE FROM chat_users WHERE id = $1::int",
	"DELETE FROM comments WHERE chat_id = $1::int",
	"DELETE FROM chat_users WHERE chat_id = $1::int",
	"DELETE FROM chat_rooms WHERE id = $1::int"
];

// Get a chat room from the database
function getRoomFromDb(id, callback) {
	var sql = queries[0];
	var params = [id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
		// log the result to the console
		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}

// Get chat rooms of a user from the database
function getChatUsersFromDb(id, callback) {
	var sql = queries[1];
	var params = [id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
		// log the result to the console
		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}

// Get comments of a chat room from the db
function getRoomCommentsFromDb(id, callback) {
	var sql = queries[2];
	var params = [id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
		// log the result to the console
		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});
}

// Insert a room into the database, then add the admin to the room
function insertRoomIntoDb(name, admin_id, callback) {
	var sql = queries[3];
	var params = [name, admin_id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			// log the success of the query
			console.log("Chat Room successfully added with name " + name + " by admin with id " + admin_id);
			console.log("Found result: " + JSON.stringify(result.rows));
			// add the admin that created the room
			addUserToRoomInDb(admin_id, result.rows[0].id, callback);
		}

	});
}

// Add a user in a room in the db
function addUserToRoomInDb(user_id, chat_id, callback) {
	var sql = queries[4];
	var params = [user_id, chat_id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			// log the success of the query
			console.log("User with id " + user_id + " added to room with id " + chat_id);
			callback(null);
		}

	});
}

// Update the image_data of a chat room
function updateImageInDb(id, image_data, callback) {
	var sql = queries[5];
	var params = [id, image_data];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			// log the success of the query
			console.log("Updated image of room with id " + id);
			callback(null);
		}

	});
}

// Remove the user from a chat room in the database
function removeUserInDb(id, callback) {
	var sql = queries[6];
	var params = [id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			// log the success of the query
			console.log("Removed user with chat_user id " + id);
			callback(null);
		}

	});
}

/**************** Delete a Room from the database. ********************
 * Delete Comments, Remove Room Users, then Remove the Room.
 * Call deleteRoomFromDb to initiate.
 **********************************************************************/ 
// Remove chat room from the database, start with comments
function deleteRoomFromDb(id, callback) {
	var sql = queries[7];
	var params = [id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			// start the next query
			console.log("Removing chat room with id " + id);
			deleteRoomRelationships(id, callback);
		}

	});
}

// Remove the room relationships of the room being deleted
function deleteRoomRelationships(id, callback) {
	var sql = queries[8];
	var params = [id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			// start the next query
			console.log("Removing chat room with id " + id);
			deleteRoom(id, callback);
		}

	});
}

// Remove the room to finish
function deleteRoom(id, callback) {
	var sql = queries[9];
	var params = [id];

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}else{
			// log the success of the query
			console.log("Removed chat room with id " + id);
			callback(null);
		}

	});
}
/**************** End of deleteRoomFromDb *********************/

module.exports = { getRoomFromDb:getRoomFromDb, getChatUsersFromDb:getChatUsersFromDb, getRoomCommentsFromDb:getRoomCommentsFromDb,
									 insertRoomIntoDb:insertRoomIntoDb, addUserToRoomInDb:addUserToRoomInDb, updateImageInDb:updateImageInDb,
									 removeUserInDb:removeUserInDb, deleteRoomFromDb:deleteRoomFromDb };