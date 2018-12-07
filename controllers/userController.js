const userModel = require("../models/userModel.js");

// Get a user by id
function getUserById(req, res) {
	var id = req.body.id;
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
	var username = req.body.username;
	var password = req.body.password;
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

// Log the user in
function handleLogin(req, res) {
	var result = {success: false};
	var username = req.body.username;
	var password = req.body.password;

	userModel.getUserFromDbByInfo(username, password, function(error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			console.log("USER FOUND: " + result);
			var id = result[0].id;
			req.session.user = id;
			console.log("Session id: " + req.session.user);
			result = {success: true};
			res.json(result);
		}
	});
}

// Log the user out
function handleLogout(req, res) {
	var result = {success: false};

	if (req.session.user) {
		req.session.destroy();
		result = {success: true};
	}

	res.json(result);
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
			result = { success:true, newUser: {username:username, password:password } };
			res.status(200).json(result);
		}
	});
}

// SEarch users by item
function searchUsers(req, res) {
	var item = req.query.item;
	console.log("Searching usernames containing " + item);
	userModel.searchUsers(item, function (error, result) {
		if (error) {
			res.status(500).json({success:false, data:error});
		} else {
			var users = result;
			res.status(200).json(result);
		}
	});
}

module.exports = { getUserById:getUserById, getUserByInfo:getUserByInfo, getUserRooms:getUserRooms, postUser:postUser,
									 searchUsers:searchUsers, handleLogin:handleLogin, handleLogout:handleLogout };