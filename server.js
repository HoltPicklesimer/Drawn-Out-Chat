const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const queries = require("./queries");

// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");

const pool = new Pool({connectionString: connectionString});

// Set up the static and views directories
app.use(express.static(__dirname + '/public'));
app.set("views", path.join(__dirname, 'views'));

// Set the port
app.set('port', (process.env.PORT || 5000));

// Listen on the port
app.listen(app.get('port'), function(req, res){
	console.log("Listening on port " + app.get('port'));
});

app.get("/getUser", queries.getUser);
app.get("/getChatRoom", queries.getChatRoom);
app.get("/getUserRooms", queries.getUserRooms);
app.get("/getChatUsers", queries.getChatUsers);
app.get("/getComment", queries.getComment);
app.get("/getRoomComments", queries.getRoomComments);