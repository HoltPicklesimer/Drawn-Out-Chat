// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});

const userModel = require("../models/userModel");

// Get a user
function getUser(req, res) {
	console.log("Getting User " + req.query.id);
	var id = req.query.id;
	var username = req.query.username;
	var password = req.query.password;
	console.log("Trying to connect to a database at " + connectionString);
	getUserFromDb(id, username, password, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var user = result[0];
			res.status(200).json(result[0]);
		}
	});
	res.end();
}

// Get the chat rooms of a user
function getUserRooms(req, res) {
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
}

// Create a user
function postUser(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log("Inserting User " + username);
	console.log("Trying to connect to a database at " + connectionString);
	console.log("Wanting to add: " + req.body.username);
	var result = { status: "success"
							 , entity: {username:username, password:password}
							 };
	res.json(result);
	insertUserIntoDb(username, password, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		}
	});
	res.end();
}

module.exports = { getUser:getUser, getUserRooms:getUserRooms, postUser:postUser };