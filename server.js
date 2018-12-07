const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const fs = require("fs");
var session = require('express-session');

// set up session
app.use(session({
  secret: 'paint-secret-key',
  resave: false,
  saveUninitialized: true
}));

const userController = require("./controllers/userController");
const chatController = require("./controllers/chatController");
const commentController = require("./controllers/commentController");

app.use(express.json());                      // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support URL-encoded bodies

// Set up the static and views directories
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, 'views'));

// Set the port
app.set('port', (process.env.PORT || 5000));

// Listen on the port
app.listen(app.get('port'), function(req, res){
	console.log("Listening on port " + app.get('port'));
});

app .post("/getUserById", userController.getUserById) // id
		.post("/getUserByInfo", userController.getUserByInfo) // username, password
		.get("/getUserRooms", userController.getUserRooms) // id
		.post("/postUser", userController.postUser) // username, password
		.get("/getChatRoom", chatController.getChatRoom) // id
		.get("/getChatUsers", chatController.getChatUsers) // id
		.get("/getRoomComments", chatController.getRoomComments) // id
		.post("/postRoom", chatController.postRoom) // name, adminId
		.post("/addUser", chatController.addUser) // userId, chatId
		.post("/putImage", chatController.putImage) // id, imageData
		.post("/removeUserFromRoom", chatController.removeUserFromRoom) // userId, chatId
		.get("/getComment", commentController.getComment) // id
		.post("/postComment", commentController.postComment) // chatId, userId, content
		.post("/deleteComment", commentController.deleteComment) // id
		.get("/searchUsers", userController.searchUsers) // item
		.post("/deleteRoom", chatController.deleteRoom) // id
		.post("/login", userController.handleLogin)
		.post("/logout", userController.handleLogout)
		.post("/getSessionId", function(req, res) {
			var result = {success: false};
			if (req.session.user)
				result = {success: true, id:req.session.user};
			res.json(result);
		});




// Middle-Ware: check if logged in
function verifyLogin(req, res, next) {
	if (req.session.user) {
		// They are logged in
		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {succes:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}