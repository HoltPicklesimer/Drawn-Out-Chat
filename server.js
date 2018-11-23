const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const fs = require("fs");
const selects = require("./selects");
const inserts = require("./inserts");
const updates = require("./updates");
const deletes = require("./deletes");

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// Set up the static and views directories
app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, 'views'));

// Set the port
app.set('port', (process.env.PORT || 5000));

// Listen on the port
app.listen(app.get('port'), function(req, res){
	console.log("Listening on port " + app.get('port'));
});

// Need to make this work
// app.get("/", function(req, res) {
// 	res.sendFile("main.html");
// });
app.get("/getUser", selects.getUser);
app.get("/getChatRoom", selects.getChatRoom);
app.get("/getUserRooms", selects.getUserRooms);
app.get("/getChatUsers", selects.getChatUsers);
app.get("/getComment", selects.getComment);
app.get("/getRoomComments", selects.getRoomComments);
app.post("/postUser", inserts.postUser);
app.post("/postRoom", inserts.postRoom);
app.post("/addUser", inserts.addUser);
app.post("/postComment", inserts.postComment);
app.post("/putImage", updates.putImage);
app.post("/removeUserFromRoom", deletes.removeUserFromRoom);
app.post("/deleteComment", deletes.deleteComment);