const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const fs = require("fs");

const userController = require("./controllers/userController");
const chatController = require("./controllers/chatController");
const commentController = require("./controllers/commentController");

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// Set up the static and views directories
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, 'views'));

// Set the port
app.set('port', (process.env.PORT || 5000));

// Listen on the port
app.listen(app.get('port'), function(req, res){
	console.log("Listening on port " + app.get('port'));
});

app.get("/getUserById", userController.getUserById)
		.get("/getUserByInfo", userController.getUserByInfo)
		.get("/getUserRooms", userController.getUserRooms)
		.post("/postUser", userController.postUser)
		.get("/getChatRoom", chatController.getChatRoom)
		.get("/getChatUsers", chatController.getChatUsers)
		.get("/getRoomComments", chatController.getRoomComments)
		.post("/postRoom", chatController.postRoom)
		.post("/addUser", chatController.addUser)
		.post("/putImage", chatController.putImage)
		.post("/removeUserFromRoom", chatController.removeUserFromRoom)
		.get("/getComment", commentController.getComment)
		.post("/postComment", commentController.postComment)
		.post("/deleteComment", commentController.deleteComment);