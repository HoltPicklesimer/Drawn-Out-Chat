function login() {
	var user = $("#username").val();
	var pass = $("#password").val();

	var params = { id:chat_id };
	$.get(url + "getChatRoom", params, function(data, status){
		console.log(status);
		if (status == "success")
			loadImage(data.image_data);
	});
}