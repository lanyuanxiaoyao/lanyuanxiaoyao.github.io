	var speed = 5;
	var rate = 1;
	var flag = 0;
	var start_pos;
	
	function move() {
		var timer;
		var img1 = $("one");
		var img2 = $("two");
		var img3 = $("three");
		if (img3.offsetTop < 240) {
			img3.style.top = (img3.offsetTop + speed) + 'px';
			if (img2.offsetTop < 170) {
			img2.style.top = (img2.offsetTop + speed) + 'px';
			if (img1.offsetTop < 100) {
			img1.style.top = (img1.offsetTop + speed) + 'px';
		}
		}
		} else {
			clearTimeout(timer);
			return;
		}
		timer = setTimeout("move()", rate);
	}
	function move_back() {
		var timer6;
		var img4 = $("one");
		var img5 = $("two");
		var img6 = $("three");
		if (img6.offsetTop > start_pos) {
			img6.style.top = (img6.offsetTop - speed) + 'px';
			if (img5.offsetTop > start_pos) {
			img5.style.top = (img5.offsetTop - speed) + 'px';
			if (img4.offsetTop > start_pos) {
			img4.style.top = (img4.offsetTop - speed) + 'px';
		}
		}
		} else {
			clearTimeout(timer6);
			return;
		}
		timer6 = setTimeout("move_back()", rate);
	}
	function $(name) {
		return document.getElementById(name);
	}

	function start() {
		start_pos = $("blog_badge").offsetTop;
		if (!flag) {
			move();
			flag = 1;
		} else {
			move_back();
			flag = 0;
		}
	}