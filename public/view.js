var user_id = 13;
var chat_id;
var isAdmin = false;

$(function(){ setInterval(updateOnTimer, 1000);}); // set a clock to update every second to reload the comments

var url = "https://gentle-tundra-31449.herokuapp.com/";

function updateOnTimer() {
	loadComments();
	loadRoomUsers();
	loadUserRooms();
}

/* When a user adds a change to the image, save it to the database */
function saveImage() {
	// Get the image data
	var data = JSON.stringify(getImage());

	// Set up the parameters to send to the Controller
	var params = { id:chat_id, imageData:data };

	$.post(url + "putImage", params, function(data, status){
		console.log(status);
	});
}

/* Load the user info */
function loadUser () {
	// load the basic user info
	var params = { id:user_id };
	$.get(url + "getUserById", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			$("#user").html(data.username);
		}
	});

	loadUserRooms();
}

function loadUserRooms() {
	// load the rooms the user is a member of
	var params = { id:user_id };
	$.get(url + "getUserRooms", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			$("#selectRoom").empty();
			for (var i = 0; i < data.length; ++i)
				$("#selectRoom").append("<option value='" + data[i].id + "'>" + data[i].name + "</option>");
			loadRoom();
		}
	});
}

/* When the room is requested, load the name, image, comment, and users. */
function loadRoom() {
	chat_id = document.getElementById("selectRoom").options[document.getElementById("selectRoom").selectedIndex].value;
	// Set up the parameters to send to the Controller
	var params = { id:chat_id };
	// Use jQuery to make the request
	$.get(url + "getChatRoom", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			$("#chatName").html(data.name);
			$("#admin").html(data.username);
			if (user_id == data.admin_id)
				isAdmin = true;
			else
				$("#addUserDiv").empty();
			loadImage(data.image_data);
			loadRoomUsers();
			loadComments(chat_id);
		}
	});
}

/* Load the image data passed as a parameter. */
function loadImage(data) {
	var image = JSON.parse(data);
	if (clickX.length != image.clickX.length)
	{
		context.clearRect(0,0,context.canvas.width,context.canvas.height);
		clickX = image.clickX;
	  clickY = image.clickY;
	  clickDrag = image.clickDrag;
	  clickColor = image.clickColor;
	  clickSize = image.clickSize;
	}
  redraw();
}

function loadComments(id) {
	var params = { id:chat_id };
	$.get(url + "getRoomComments", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			$("#commentSection").empty();
			for (var i = 0; i < data.length; ++i)
			{
				var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
				var date = new Date(data[i].date_published);
				var dateString = date.toLocaleDateString("en-US", options);
				$("#commentSection").append("<hr style='width:90%' />");
				$("#commentSection").append("<button class='btn btn-danger' onclick='removeComment(\"" + data[i].id + "\")'>-</button>");
				$("#commentSection").append(" " + data[i].username + " said on " + dateString + "<br/><br/>");
				$("#commentSection").append("<p style='width: 75%;padding: 0px 60px'>" + data[i].content + "</p>");
			}
		}
	});
}

/* Update the image */
function updateImage() {
	// update the image
	var params = { id:chat_id };
	$.get(url + "getChatRoom", params, function(data, status){
		console.log(status);
		if (status == "success")
			loadImage(data.image_data);
	});
}

/* Search Users */
function searchUsers() {
	var item = $("#userSearch").val();
	if (item == "")
	{
		$("#searchedUsers").empty();
		return;
	}
	console.log(item);
	var params = { item:item };
	$.get(url + "searchUsers", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			console.log(data);
			$("#searchedUsers").empty();
			for (var i = 0; i < data.length; ++i)
				$("#searchedUsers").append("<button class='btn btn-success' onclick='addUser(\""
					+ data[i].id + "\")'>+</button> " + data[i].username + "<br/>");
		}
	});
}

/* Load users of this Room */
function loadRoomUsers() {
	var params = { id:chat_id };
	$.get(url + "getChatUsers", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			$("#userList").empty();
			for (var i = 0; i < data.length; ++i)
			{
				if (isAdmin && user_id != data[i].user_id)
					$("#userList").append("<button class='btn btn-danger' onclick='removeUsers(\""
					+ data[i].id + "\")'>+</button> ");
				$("#userList").append(data[i].username + "<br/>");
			}
		}
	});
}

/* Clear the users when focus is lost on the search bar */
function clearUserSearch() {
	if ($("#searchedUsers") == "")
		$("#searchedUsers").empty();
}

/* When a user adds a comment to the Chat room */
function addComment() {
	// Get the comment
	var data = $("#commentBox").val();

	if (data == "")
		return;

	// Set up the parameters to send to the Controller
	var params = { chatId:chat_id, userId:user_id, content:data };

	$.post(url + "postComment", params, function(data, status){
		console.log(status);
		if (status == "success")
		{
			$("#commentBox").val('');
		}
	});
}

function createChatRoom() {
	// Get the name
	var name = $("#chatNamer").val();

	if (name == "")
		return;

	// Set up the parameters to send to the Controller
	var params = { name:name, adminId:user_id };

	$.post(url + "postRoom", params, function(data, status){
		console.log(status);
		loadUserRooms();
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