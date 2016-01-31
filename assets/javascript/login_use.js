var flag = 0;
function checkuser() {
	if($('password') == "limingka") {
		flag = 1;
		return true;
    }
	if($('password') == "yaohuajing") {
		flag = 1;
		return true;
    }
	if($('password') == "shaoguoji") {
		flag = 1;
		return true;
    }
	if($('password') == "yangzhiying") {
		flag = 1;
		return true;
    }
	if($('password') == "liangjiayi") {
		flag = 1;
		window.location.href="liangjiayi.html";
    }
	if(flag == 0){
		alert("You do not have access to this site. If you want to request access, please contact the bloggers.");
	}
	return false;
}
		
function $(id) {
    return document.getElementById(id).value;
}
function cookie_permissiom(){
	document.cookie = "permission=yes";
}