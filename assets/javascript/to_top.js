/*var rate = 1;
var scroll_length = 100;

var timer;
var screen_height;

function go() {
	// document.getElementById("to_top");
	screen_height = getScrool();
	timer = setInterval("goTop()", rate);
}

function goTop() {
	if (screen_height > scroll) {
		screen_height = screen_height - scroll;
		document.documentElement.scrollTop = document.body.scrollTop = screen_height;
	} else {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		clearInterval(timer);
	}
}

function getScrool() {
	return document.documentElement.scrollTop || document.body.scrollTop;
}*/
//第一个参数是按钮id；第二个参数是一个布尔值，true是一直显示按钮，false是当滚动距离不为0时，显示按钮
function goTopEx() {
	var obj = document.getElementById("goTopBtn");
	function getScrollTop() {
		return document.documentElement.scrollTop + document.body.scrollTop;
	}
	function setScrollTop(value) {
		if (document.documentElement.scrollTop) {
			document.documentElement.scrollTop = value;
		} else {
			document.body.scrollTop = value;
		}
	}
	window.onscroll = function() {
		getScrollTop() > 0 ? obj.style.display = ""
				: obj.style.display = "none";
	}
	obj.onclick = function() {
		var goTop = setInterval(scrollMove, 10);
		function scrollMove() {
			setScrollTop(getScrollTop() / 1.1);
			if (getScrollTop() < 1)
				clearInterval(goTop);
		}
	}
}