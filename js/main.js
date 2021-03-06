var table = document.getElementById("table");
var rs = document.querySelector(".rs");

var tds = []; //二维数组
//两层for循环干了两件事儿：
//1）创建了DOM对象，创建了400个td，20个td，追加到了table里面。
//2）将400个td放到tds数组里面了，tds是一个二维数组，存放着td的DOM元素
//按理说，地图的初始化，应该也是类，无所谓了啊！
for(var i = 0; i < 15; i++) {
	var tr = document.createElement("tr");
	var thisrowtd = []; //存放当前行的td的数组，存放的是DOM对象
	for(var j = 0; j < 15; j++) {
		var td = document.createElement("td");
		tr.appendChild(td);
		thisrowtd.push(td);
	}
	table.appendChild(tr);
	tds.push(thisrowtd);
}

//蛇类，唯一的类。
function Snake() {
	//身体上的各个方块：
	this.bodyArr = [{
			x: 3,
			y: 9
		},
		{
			x: 3,
			y: 8
		}
	];
	//移动方向
	this.direction = "right"; //合法值top、left、right、down
	//渲染方法
	this.render();
	//绑定监听
	this.bindEvent();
}

//渲染方法
Snake.prototype.render = function() {
	//重置画布所有的元素，都没有类名
	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			tds[i][j].className = "";
		}
	}
	//让自己的细胞这些小格加类
	for(var i = 0; i < this.bodyArr.length; i++) {
		tds[this.bodyArr[i].x][this.bodyArr[i].y].className = "wxzs";
	}
}

//更新自己
Snake.prototype.update = function() {
	this.bodyArr.pop(); //删除尾巴
	switch(this.direction) {
		case "right": //在头部添加一项
			this.bodyArr.unshift({
				x: this.bodyArr[0].x,
				y: this.bodyArr[0].y + 1
			});
			break;
		case "top": //在头部添加一项
			this.bodyArr.unshift({
				x: this.bodyArr[0].x - 1,
				y: this.bodyArr[0].y
			});
			break;
		case "down": //在头部添加一项
			this.bodyArr.unshift({
				x: this.bodyArr[0].x + 1,
				y: this.bodyArr[0].y
			});
			break;
		case "left": //在头部添加一项
			this.bodyArr.unshift({
				x: this.bodyArr[0].x,
				y: this.bodyArr[0].y - 1
			});
			break;
	}
	//检查自己有没有碰到食物
	if(this.bodyArr[0].x == food.x && this.bodyArr[0].y == food.y) {
		food.change();
		this.growup();
	}
}

Snake.prototype.bindEvent = function() {
	//备份this
	var self = this;
	//页面的键盘按下事件
	document.onkeydown = function(event) {
		event = event || window.event;
		switch(event.keyCode) {
			case 37:
				if(self.direction == "right") {
					return;
				}
				self.direction = "left";
				break;
			case 38:
				if(self.direction == "down") {
					return;
				}
				self.direction = "top";
				break;
			case 39:
				if(self.direction == "left") {
					return;
				}
				self.direction = "right";
				break;
			case 40:
				if(self.direction == "top") {
					return;
				}
				self.direction = "down";
				break;
		}
	}
}

//长大方法
Snake.prototype.growup = function() {
	switch(this.direction) {
		case "right": //在头部添加一项
			this.bodyArr.unshift({
				x: this.bodyArr[0].x,
				y: this.bodyArr[0].y + 1
			});
			break;
		case "top": //在头部添加一项
			this.bodyArr.unshift({
				x: this.bodyArr[0].x - 1,
				y: this.bodyArr[0].y
			});
			break;
		case "down": //在头部添加一项
			this.bodyArr.unshift({
				x: this.bodyArr[0].x + 1,
				y: this.bodyArr[0].y
			});
			break;
		case "left": //在头部添加一项
			this.bodyArr.unshift({
				x: this.bodyArr[0].x,
				y: this.bodyArr[0].y - 1
			});
			break;
	}
}

//食物类
function Food(x, y) {
	this.change();
}

//渲染
Food.prototype.render = function() {
	tds[this.x][this.y].className = "blue";
}

//改变位置
Food.prototype.change = function() {
	this.x = parseInt(Math.random() * 15);
	this.y = parseInt(Math.random() * 15);
	for(var i = 0; i < snake.bodyArr.length; i++) {
		if(this.x == snake.bodyArr[i].x && this.y == snake.bodyArr[i].y) {
			this.change();
			return;
		}
	}
}

var snake = new Snake();
var food = new Food();
setInterval(function() {
		//每秒蛇都在更新、每秒蛇都在渲染
		snake.update();
		snake.render();
		//食物也要产生
		food.render();
	}

	, 400);

rs.addEventListener("click", function() {
	window.location.reload();
});