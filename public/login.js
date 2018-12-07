var url = "https://gentle-tundra-31449.herokuapp.com/";

function login() {
	var user = $("#username").val();
	var pass = $("#password").val();

	if (!user || !pass)
		displayError();
	else
		clearError();

	var params = { username:user, password:pass };
	$.post(url + "login", params, function(data, status){
		console.log(status);
		if (status == "success")
			window.location.href = url + "paint.html";
		else
			displayError();
	});
}

// display an error if there is invalid input
function displayError() {
	$("#errorMessage").html("Your username or password are incorrect.");
}

// clear errors when input has been fixed
function clearError() {
	$("#errorMessage").empty();
}