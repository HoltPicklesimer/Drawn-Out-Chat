const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const selects = require("./selects");
const inserts = require("./inserts");

// Set up the static and views directories
app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, 'views'));

// Set the port
app.set('port', (process.env.PORT || 5000));

// Listen on the port
app.listen(app.get('port'), function(req, res){
	console.log("Listening on port " + app.get('port'));
});

app.get("/", res.sendFile());
app.get("/getUser", selects.getUser);
app.get("/getChatRoom", selects.getChatRoom);
app.get("/getUserRooms", selects.getUserRooms);
app.get("/getChatUsers", selects.getChatUsers);
app.get("/getComment", selects.getComment);
app.get("/getRoomComments", selects.getRoomComments);
app.get("/postUser", inserts.postUser);