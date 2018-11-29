const commentModel = require("../models/commentModel.js");

// Get a comment
function getComment(req, res) {
	var id = req.query.id;
	console.log("Getting Comment " + id);
	commentModel.getCommentFromDb(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			var comment = result[0];
			res.status(200).json(result[0]);
		}
	});
}

// Create a comment
function postComment(req, res) {
	var chat_id = req.body.chatId;
	var user_id = req.body.userId;
	var content = req.body.content;
	console.log("Inserting comment from user with id " + user_id + " into room with id " + chat_id);
	commentModel.insertCommentIntoDb(chat_id, user_id, content, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			result = { success:true, comment: { chat_id:chat_id, user_id:user_id, content:content } };
			res.status(200).json(result);
		}
	});
}

// Delete a comment
function deleteComment(req, res) {
	var id = req.body.id;
	console.log("Removing comment of id " + id);
	commentModel.deleteCommentFromDb(id, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			result = { success:true, commentDeleted: { id:id } };
			res.status(200).json(result);
		}
	});
}

module.exports = { getComment:getComment, postComment:postComment, deleteComment:deleteComment };