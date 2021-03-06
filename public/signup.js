var url = "https://gentle-tundra-31449.herokuapp.com/";

function signup() {
	var user = $("#username").val();
	var pass = $("#password").val();
	var pass2 = $("#password2").val();

	if (user == "" || pass == "" || pass != pass2)
	{
		displayError();
		return;
	}
	else
		clearMessages();

	var params = { username:user };
	$.post(url + "checkUsersWithUsername", params, function(data, status){
		console.log(status);
		if (data.success)
			displayError();
		else
			insertUser(user, pass);
	});
}

// display an error if there is invalid input
function displayError() {
	$("#errorMessage").html("Error: Invalid Username or Password.");
}

// display an error if there is invalid input
function insertUser(user, pass) {
	console.log("inserting user");
	var params = { username:user, password:pass };
	$.post(url + "postUser", params, function(data, status){
		console.log(status);
		if (data.success)
			$("#success").html("User account created.");
	});
}

// clear messages when the sign-up button is pressed
function clearMessages() {
	$("#errorMessage").empty();
	$("#success").empty();
}