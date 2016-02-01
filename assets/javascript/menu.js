	var speed = 5;
	var rate = 1;
	var flag = 0;
	var start_pos;
	
	function move() {
		var img1 = $("one");
		var img2 = $("two");
		var img3 = $("three");
		img1.style.top = start_pos*3.5 + 'px';
		img2.style.top = start_pos*5.8 + 'px';
		img3.style.top = start_pos*8.1 + 'px';
		/*var timer;
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
		timer = setTimeout("move()", rate);*/
		/*for(var i = start_pos;i < 100;i += speed){
			img1.style.top = (img1.offsetTop + speed) + 'px';
		}
		for(var i = start_pos;i < 170;i += speed){
			img2.style.top = (img2.offsetTop + speed) + 'px';
		}
		for(var i = start_pos;i < 240;i += speed){
			img3.style.top = (img3.offsetTop + speed) + 'px';
		}*/
	}
	function move_back() {
		var img1 = $("one");
		var img2 = $("two");
		var img3 = $("three");
		img1.style.top = start_pos + 'px';
		img2.style.top = start_pos + 'px';
		img3.style.top = start_pos + 'px';
		/*var timer;
		if (img3.offsetTop < 240) {
			img3.style.top = (img3.offsetTop - speed) + 'px';
			if (img2.offsetTop < 170) {
			img2.style.top = (img2.offsetTop - speed) + 'px';
			if (img1.offsetTop < 100) {
			img1.style.top = (img1.offsetTop - speed) + 'px';
		}
		}
		} else {
			clearTimeout(timer);
			return;
		}
		timer = setTimeout("move()", rate);*/
		/*for(var i = 100;i > start_pos;i -= speed){
			img1.style.top = (img1.offsetTop - speed) + 'px';
		}
		for(var i = 170;i > start_pos;i -= speed){
			img2.style.top = (img2.offsetTop - speed) + 'px';
		}
		for(var i = 240;i > start_pos;i -= speed){
			img3.style.top = (img3.offsetTop - speed) + 'px';
		}*/
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