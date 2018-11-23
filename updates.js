// Get the database url
const connectionString = process.env.DATABASE_URL;
const { Pool } = require("pg");
const pool = new Pool({connectionString: connectionString});

module.exports = {
// Update an image of a chat room
putImage: function putImage(req, res) {
	var id = req.body.id;
	var image_data = req.body.imageData;
	console.log("Updating image of chat room with index " + id);
	console.log("Trying to connect to a database at " + connectionString);
	updateImageInDb(id, image_data, function (error, result) {
		if (error || result == null || result.length != 1) {
			res.status(500).json({success:false, data:error});
		}
	});
	res.end();
}

}

var queries = [
	"UPDATE chat_rooms SET image_data = $2::text WHERE id = $1::int"
];

// Update the image_data of a chat room
function updateImageInDb(id, image_data, callback) {
	var sql = queries[0];
	var params = [id, image_data];

	console.log("Updating Image Now...");

	pool.query(sql, params, function(err, result){

		if (err) {
			console.log("Error in query: ");
			console.log(err);
			callback(err, null);
		}
	});
}

