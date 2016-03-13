function get_cookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end = -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

function check() {
	var iscookie = document.cookie.indexOf(“firstVisit = ”); //得到分割的cookie名值
	if (iscookie == -1) { //判断cookie是否存在
		document.cookie = "firstVisit = 1";
		window.location.href = 'index2.html'; //跳转网页
		alter("hnachnsdanl")
	}
}