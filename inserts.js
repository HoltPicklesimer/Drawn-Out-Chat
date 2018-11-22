// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});

module.exports = {
// Get a user
postUser: function postUser(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log("Inserting User " + username);
	console.log("Trying to connect to a database at " + connectionString);
	insertUserIntoDb(username, password, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		} else {
			// var user = result[0];
			// res.status(200).json(result[0]);
		}
	});
}

}

var queries = [
	"INSERT INTO users (username, password) VALUES ($1::varchar, $2::varchar)"
];

// Get a user from the database
function insertUserIntoDb(username, password, callback) {
	var sql = queries[0];
	var params = [username, password];

	console.log("Inserting user now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}

		// console.log("Found result: " + JSON.stringify(result.rows));

		// callback(null, result.rows);
	});
}