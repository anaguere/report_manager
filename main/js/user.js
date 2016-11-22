$(document).ready(function(){
	checkUser();
});

function checkUser() {
	$('input').focusout(function(){
		if ($(this).val() == "") {
			alert("Not empty");
		}
	});
}

function resetUser() {
	$('input').val("");
}

function saveUser(){
	$.post("../controller/users_detail_controller.php",{
		router : "create",
		user_full_name : $('#user_full_name').val(),
		user_national_id : $('#user_national_id').val(),
		user_email : $('#user_email').val(),
		user_type : $('#user_type').val(),
		user_login : $('#user_login').val(),
		user_password : $('#user_password').val()
	}).done(function(e){
		var result = JSON.parse(e);
		if (result.conexion) {
			alert("User added successful");
		}else{
			alert("Having problems including new user");
		}
	});
}

function loginUser(){
	$.post("../controller/users_detail_controller.php",{
		router : "login_user",
		user_login : $('#user_login').val(),
		user_password : $('#user_password').val()
	}).done(function(e){
		var result = JSON.parse(e);
		if (result.conexion == 'false') {
			alert("Login / Password is wrong!");
		}else{
			sessionStorage.login = "ok";
			sessionStorage.user_name = result.contenido[0].user_inf_full_name;
			if ($.trim(result.contenido[0].user_inf_type) == "CAMC") {
				location = 'index.html';
			}
		}
	});
}

function logoutUser(){
	sessionStorage.removeItem("login");
	sessionStorage.removeItem("user_name");
	location ='login.html';
}