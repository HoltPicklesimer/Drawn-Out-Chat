const userModel = require("../models/userModel.js");

// Get a user by id
function getUserById(req, res) {
	var id = req.query.id;
	console.log("Getting User with id " + id);
	userModel.getUserFromDbById(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var user = result[0];
			res.status(200).json(result[0]);
		}
	});
}

// Get a user by username and password
function getUserByInfo(req, res) {
	var username = req.query.username;
	var password = req.query.password;
	console.log("Getting User with username " + username + " and password " + password);
	userModel.getUserFromDbByInfo(username, password, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var user = result[0];
			res.status(200).json(result[0]);
		}
	});
}

// Get the chat rooms of a user
function getUserRooms(req, res) {
	var id = req.query.id;
	console.log("Getting Chat Rooms of User with id " + id);
	userModel.getUserRoomsFromDb(id, function (error, result) {
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
	console.log("Inserting User " + username + " with password " + password);
	
	userModel.insertUserIntoDb(username, password, function (error, result) {
		if (error) {
			res.status(500).json({success:false, data:error});
		} else {
			res.status(200).json(result);
		}
	});
}

module.exports = { getUserById:getUserById, getUserByInfo:getUserByInfo, getUserRooms:getUserRooms, postUser:postUser };