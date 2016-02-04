/**
 * @author floyd
 */


var Mouse = function(type){
	this.mouse = null;
	this.num = -1;
	this.hole = -1;
	this.init(type);
}
Mouse.prototype = {
	mousetype: {
		"good": "img/good.gif",
		"bad": "img/bad.gif",
		"goodkill":"img/goodkill.gif",
		"badkill":"img/badkill.gif"
	},
	init : function(type){
		type = type || 'good';
		var _this = this;
		
		this.mouse = document.createElement("div");
		this.mouse.mousetype = type;
		this.mouse.islive = true;
		this.mouse.style.cssText = 'width:75px;height:100px;background:url('+this.mousetype[type]+');left:0;top:20px;\
		position:relative;margin:auto;cursor:pointer;';
		
		this.mouse.onclick = function(e){_this.beat(e);};
	},
	beat : function(e){
		
		if(this.mouse.islive){
			
			this.mouse.islive = false;
			this.onbeat();
			this.mouse.style.background = "url("+this.mousetype[this.mouse.mousetype+"kill"]+")";
		}
	},
	animation : function(speed){
		
		speed = speed == 'fast'?20:speed == 'normal'?40:50;
		
		var obj = this.mouse,ost = obj.style,oTop = parseInt(ost.top,10),cut=5,_this = this;
		
		var show = function(top){
			
			top = top-cut;
			
			if(top >= -40){
				ost.top = top + 'px';
				setTimeout(function(){show(top);},speed);
			}
			else
			{
				setTimeout(function(){hide(-40);},speed*10);
			}
		}
		var hide = function(top){
			
			top = top+cut;
			
			if(top <= oTop){
				ost.top = top + 'px';
				setTimeout(function(){hide(top);},speed);
			}
			else {
				_this.reset();
			}
		}
		show(oTop);
	},
	reset : function(){
		
		this.mouse.islive =true;
		this.mouse.style.background = "url("+this.mousetype[this.mouse.mousetype]+")";
		
		this.onend();
	},
	onbeat : function(){},
	onend : function(){}
}


var Game = {
	time : 31,
	mouseMap : {
		1:'good',
		2:'bad',
		3:'good',
		4:'good',
		5:'bad',
		6:'good',
		7:'bad',
		8:'good',
		9:'good',
		10:'good'
	},
	allMouse : [],
	nowScore : 0,
	hasHole : {},
	hasMouse : {},
	lis : null,
	init : function(){

		this.lis = document.getElementById('panel').getElementsByTagName('li');
		_this = this;

		for(var i=1;i <=10;i++){
			var mouse = new Mouse(this.mouseMap[i]);
			mouse.onbeat = function(){
				Game.changeScore(1 * (this.mouse.mousetype=='good'?1:-1));
			}
			mouse.onend = function(){
				var li = _this.lis[this.hole];
				li.removeChild(li.mouse.mouse);
				li.mouse = null;
				
				_this.hasHole[this.hole] = null;
				_this.hasMouse[this.num] = null;
			}
			this.allMouse.push(mouse);
		}
	},
	changeScore : function(score){
		this.nowScore += score;
		document.getElementById('score').innerHTML = this.nowScore;
	},
	start : function(){
		
		if(this.time <= 0)return;
		
		var _this = this;
		
		var random = parseInt(Math.random()*9,10);
		
		while(this.hasHole[random]){
			random = parseInt(Math.random()*9,10);
		}

		var randomMouse = parseInt(Math.random()*10,10);
		
		while(this.hasMouse[randomMouse]){
			randomMouse = parseInt(Math.random()*10,10);
		}
		
		this.allMouse[randomMouse].hole = random;
		this.allMouse[randomMouse].num = randomMouse;
		this.lis[random].appendChild(this.allMouse[randomMouse].mouse);
		this.lis[random].mouse = this.allMouse[randomMouse];
		this.lis[random].mouse.animation('normal');
		
		this.hasHole[random] = 'true';
		this.hasMouse[randomMouse] = 'true';
		
		setTimeout(function(){_this.start();},250);
	},
	startTime : function(){
		
		this.time -= 1;
		var _this = this;
		
		document.getElementById('time').innerHTML = this.time;
		
		if(this.time > 0){
			setTimeout(function(){_this.startTime()},1000);
		}

		if (this.time == 0) {
			alert("共打晕 "+this.nowScore+" 只明卡！继续加油哟！")
		};
	},
	reset : function(){
		this.time = 31;
		this.allMouse = [];
		this.nowScore = 0;
		this.hasHole = {};
		this.hasMouse = {};
		this.lis = null;
		
		this.changeScore(0);
	}
}

function GameStart(){
	
	if(Game.time > 0 && Game.time != 31){
		alert("游戏尚未结束，不能重新开始哦！");
		return;
	}

	Game.reset();
	Game.init();
	Game.start();
	Game.startTime();
}
