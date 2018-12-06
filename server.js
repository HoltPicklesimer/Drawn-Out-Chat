const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const fs = require("fs");

// TEST //
const WebSocket = require('ws');
const url = 'https://gentle-tundra-31449.herokuapp.com/';
const connection = new WebSocket(url);

const wss = new WebSocket.Server({ port: port });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  })
  ws.send('send ho!');
})

connection.onopen = () => {
  console.log('open hello');
  alert('open hello');
}

connection.onerror = error => {
  console.log(`WebSocket error: ${error}`)
}

connection.onopen = () => {
  connection.send('onopen hey');
}

connection.onmessage = e => {
  console.log('onmessage ' + e.data);
}
// END OF TEST //

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

app.get("/getUserById", userController.getUserById) // id
		.get("/getUserByInfo", userController.getUserByInfo) // username, password
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
		.post("/deleteRoom", chatController.deleteRoom); // id