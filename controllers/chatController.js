const chatModel = require("../models/chatModel.js");

// Get a chat room
function getChatRoom(req, res) {
	var id = req.query.id;
	console.log("Getting Chat Room with id " + id);
	chatModel.getRoomFromDb(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var room = result[0];
			res.status(200).json(result[0]);
		}
	});
}

// Get the users of a chat room
function getChatUsers(req, res) {
	var id = req.query.id;
	console.log("Getting Users of a Chat Room with id " + id);
	chatModel.getChatUsersFromDb(id, function (error, result) {
		if (error || result == null) {
			res.status(500).json({success:false, data:error});
		} else {
			var users = result;
			res.status(200).json(result);
		}
	});
}

// Get the comments in a chat room
function getRoomComments(req, res) {
	var id = req.query.id;
	console.log("Getting Comments of Chat Room " + id);
	chatModel.getRoomCommentsFromDb(id, function (error, result) {
		if (error || result == null) {
			res.status(500).json({success:false, data:error});
		} else {
			var comments = result;
			res.status(200).json(result);
		}
	});
}

// Create a chat room
function postRoom(req, res) {
	var name = req.body.name;
	var admin_id = req.body.adminId;
	console.log("Inserting Chat Room " + name + " for admin with id " + admin_id);
	chatModel.insertRoomIntoDb(name, admin_id, function (error, result) {
		if (error) {
			res.status(500).json({success:false, data:error});
		} else {
			result = { success:true, newRoom: { name:name, admin_id:admin_id } };
			res.status(200).json(result);
		}
	});
}

// Add a user to a chat room
function addUser(req, res) {
	var user_id = req.body.userId;
	var chat_id = req.body.chatId;
	console.log("Inserting User into chat room with user id = " + user_id + " into room with id " + chat_id);
	chatModel.addUserToRoomInDb(user_id, chat_id, function (error, result) {
		if (error) {
			res.status(500).json({success:false, data:error});
		} else {
			result = { success:true, addedUser: { user_id:user_id, chat_id:chat_id } };
			res.status(200).json(result);
		}
	});
}

// Update an image of a chat room
function putImage(req, res) {
	var id = req.body.id;
	var image_data = req.body.imageData;
	console.log("Updating image of chat room with id " + id);
	chatModel.updateImageInDb(id, image_data, function (error, result) {
		if (error) {
			res.status(500).json({success:false, data:error});
		} else {
			result = { success:true, updatedRoomImage: { id:id, image_data:image_data } };
			res.status(200).json(result);
		}
	});
}

// Remove a user from a chat room
function removeUserFromRoom(req, res) {
	var id = req.body.id;
	console.log("Removing user of chat_user id " + id);
	chatModel.removeUserInDb(id, function (error, result) {
		if (error) {
			res.status(500).json({success:false, data:error});
		} else {
			result = { success:true, removedUserFromRoom: { id:id } };
			res.status(200).json(result);
		}
	});
}

// Delete a chat room
function deleteRoom(req, res) {
	var id = req.body.id;
	console.log("Deleting chat room of id " + id);
	chatModel.deleteRoomFromDb(id, function (error, result) {
		if (error) {
			res.status(500).json({success:false, data:error});
		} else {
			result = { success:true, deletedRoom: { id:id } };
			res.status(200).json(result);
		}
	});
}

module.exports = { getChatRoom:getChatRoom, getChatUsers:getChatUsers, getRoomComments:getRoomComments,
									 postRoom:postRoom, addUser:addUser, putImage:putImage, removeUserFromRoom:removeUserFromRoom,
									 deleteRoom:deleteRoom };