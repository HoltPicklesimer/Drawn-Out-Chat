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

	var params = { username:user, password:pass };
	$.post(url + "getUserByInfo", params, function(data, status){
		console.log(status);

		if (data.id)
			displayError();
		else
			displaySuccess();
	});
}

// display an error if there is invalid input
function displayError() {
	$("#errorMessage").html("Invalid Username or Password.");
}

// display an error if there is invalid input
function displaySuccess() {
	$("#success").html("User account created.");
}

// clear messages when the sign-up button is pressed
function clearMessages() {
	$("#errorMessage").empty();
	$("#success").empty();
}