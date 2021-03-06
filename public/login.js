var url = "https://gentle-tundra-31449.herokuapp.com/";

// Log the user in
function login() {
	var user = $("#username").val();
	var pass = $("#password").val();

	if (user == "" || pass == "")
	{
		displayError();
		return;
	}
	else
		clearError();

	var params = { username:user, password:pass };
	$.post(url + "login", params, function(data, status){
		console.log(status);
		console.log(data.success);
		if (data.success)
			window.location.href = url + "paint.html";
		else
			displayError();
	});
}

// display an error if there is invalid input
function displayError() {
	$("#errorMessage").html("Error: Your username or password are incorrect.");
}

// clear errors when input has been fixed
function clearError() {
	$("#errorMessage").empty();
}