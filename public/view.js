var user_id = 13;
var chat_id = 4;

$(function(){ setInterval(update, 10000);}); // set a clock to update every second

var url = "https://gentle-tundra-31449.herokuapp.com/";

/* When a user adds a change to the image, save it to the database */
function saveImage() {
	// Get the image data
	var data = JSON.stringify(getImage());

	// Set up the parameters to send to the Controller
	var params = { id:chat_id, imageData:data };

	$.post(url + "putImage", params, function(data, status){
		console.log(status);
		if (status == "success")
			console.log("Posted image data to room with id " + chat_id);
	});
}

/* Load the user info */
function loadUser () {
	var params = { id:user_id };
	$.get(url + "getUserById", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			console.log("Getting user with id " + user_id);
			$("#user").html(data.username);
		}
	});

	loadRoom();
}

/* When the room is requested, load the name, image, comment, and users. */
function loadRoom() {
	// Set up the parameters to send to the Controller
	var params = { id:chat_id };
	// Use jQuery to make the request
	$.get(url + "getChatRoom", params, function(data, status){
		console.log(status);
		console.log("Getting Room data from room with id " + chat_id);
		if (status == "success")
		{
			console.log(data);
			$("#chatName").html(data.name);
			setAdminName(data.admin_id);
			if (user_id != data.admin_id)
				$("#addUserDiv").empty();
			loadImage(data.image_data);
		}
	});
}

/* Part of the set-up for initialzing a chat room. */
function setAdminName(id) {
	var params = { id:id };
	$.get(url + "getUserById", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			console.log("Getting user with id " + id);
			$("#admin").html(data.username);
		}
	});
}

/* Load the image data passed as a parameter. */
function loadImage(data) {
	var image = JSON.parse(data);
	context.clearRect(0,0,context.canvas.width,context.canvas.height);
	clickX = image.clickX;
  clickY = image.clickY;
  clickDrag = image.clickDrag;
  clickColor = image.clickColor;
  clickSize = image.clickSize;
  redraw();
}

function update() {
	// update the image
	var params = { id:chat_id };
	$.get(url + "getChatRoom", params, function(data, status){
		console.log(status);
		console.log("Getting Room data from room with id " + chat_id);
		if (status == "success")
			loadImage(data.image_data);
	});
}

// function search() {
// 	// Get the value from the search box
// 	var searchString = $("#txtSearch").val();
// 	console.log("Searching for: " + searchString);

// 	// Set up the parameters to send to the API
// 	var params = {s: searchString, apikey:"fill_this_in_with_the_correct_key"};

// 	// Use jQuery to make the get request
// 	$.get("http://www.omdbapi.com/", params, function(data, status){
// 		// For debugging purposes, make a note that we're back
// 		console.log("Back from server with the following results:")
// 		console.log(status);
//     	console.log(data);

//     	updateResultList(data)
// 	});
// }

// function updateResultList(data) {
// 	if (data.Search && data.Search.length > 0) {
// 		var resultList = $("#ulResults");
// 		resultList.empty();

// 		for (var i = 0; i < data.Search.length; i++) {
// 			var title = data.Search[i].Title;
// 			resultList.append("<li><p>" + title + "</p></li>");
// 		}
// 	}
// }