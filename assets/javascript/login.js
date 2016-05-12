var flag = 0;
function checkuser() {
	if($('password') == "limingka") {
		flag = 1;
		set_cookie();
		window.location.href="limingka.html";
    }
	if($('password') == "yaohuajing") {
		flag = 1;
		set_cookie();
		window.location.href="jump.html";
    }
	if($('password') == "shaoguoji") {
		flag = 1;
		set_cookie();
		window.location.href="jump.html";
    }
	if($('password') == "yangzhiying") {
		flag = 1;
		set_cookie();
		window.location.href="jump.html";
    }
	if($('password') == "liangjiayi") {
		flag = 1;
		set_cookie();
		write_to_wilddog("liangjiayi");
		window.location.href="liangjiayi.html";
    }
	if(flag == 0){
		alert("You do not have access to this site. If you want to request access, please contact the bloggers.");
	}
	return false;
}

function write_to_wilddog(name){
	var dog = require("wilddog");
	var ref = new Wilddog("https://screct-garden.wilddogio.com");
	var userRef = ref.child("name");
	userRef.set({
		test{
			"name":"liangjiayi"
		}
	})
}

function $(id) {
    return document.getElementById(id).value;
}
function set_cookie(){
	document.cookie = "username=lanyuan";
}