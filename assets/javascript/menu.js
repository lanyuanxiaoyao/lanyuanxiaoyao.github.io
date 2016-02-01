	var speed = 5;
	var rate = 5;
	var flag = 0;
	var start_pos;
	
	function move_one() {
		var timer1;
		var img1 = $("one");
		if (img1.offsetTop < 100) {
			img1.style.top = (img1.offsetTop + speed) + 'px';
		} else {
			clearTimeout(timer1);
			return;
		}
		timer1 = setTimeout("move_one()", rate);
	}
	function move_two() {
		var timer2;
		var img2 = $("two");
		if (img2.offsetTop < 170) {
			img2.style.top = (img2.offsetTop + speed) + 'px';
		} else {
			clearTimeout(timer2);
			return;
		}
		timer2 = setTimeout("move_two()", rate);
	}
	function move_three() {
		var timer3;
		var img3 = $("three");
		if (img3.offsetTop < 240) {
			img3.style.top = (img3.offsetTop + speed) + 'px';
		} else {
			clearTimeout(timer3);
			return;
		}
		timer3 = setTimeout("move_three()", rate);
	}
	function move_one_back() {
		var timer4;
		var img4 = $("one");
		if (img4.offsetTop > start_pos) {
			img4.style.top = (img4.offsetTop - speed) + 'px';
		} else {
			clearTimeout(timer4);
			return;
		}
		timer4 = setTimeout("move_one_back()", rate);
	}
	function move_two_back() {
		var timer5;
		var img5 = $("two");
		if (img5.offsetTop > start_pos) {
			img5.style.top = (img5.offsetTop - speed) + 'px';
		} else {
			clearTimeout(timer5);
			return;
		}
		timer5 = setTimeout("move_two_back()", rate);
	}
	function move_three_back() {
		var timer6;
		var img6 = $("three");
		if (img6.offsetTop > start_pos) {
			img6.style.top = (img6.offsetTop - speed) + 'px';
		} else {
			clearTimeout(timer6);
			return;
		}
		timer6 = setTimeout("move_three_back()", rate);
	}
	function $(name) {
		return document.getElementById(name);
	}

	function start() {
		start_pos = $("blog_badge").offsetTop;
		if (!flag) {
			move_one();
			move_two();
			move_three();
			flag = 1;
		} else {
			move_one_back();
			move_two_back();
			move_three_back();
			flag = 0;
		}
	}