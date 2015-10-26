function Circle(x,y,radius,color){
	this.color = color;
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.count = 0;

	var maxVelocity = 10;
	this.velocity = {
		x : 5,
		y : 5
	}

	if( Math.random() > 0.5 ) this.signX = -1;
	else this.signX = 1;
	if( Math.random() > 0.5 ) this.signY = -1;
	else this.signY = 1;

}

Circle.prototype.draw = function(color,radius){
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	this.context.beginPath();
	this.context.fillStyle = color||this.color;
	this.context.arc( 
		this.x, this.y,
		radius||this.radius,
		0, Math.PI*2,
		false
	);
	this.context.closePath();
	this.context.fill();
}

Circle.prototype.clear = function(){
	this.draw("#FFFFFF",this.radius+1);
}

Circle.prototype.animate = function(){ 
	var self = this;
	var animateThis = function(){
		requestAnimationFrame(animateThis);
		self.clear();//шарики накладываются друг на друга т.к. они не проверяют будующего положения остальных
		self.x += self.velocity.x*self.signX;//надо обдумать последовательность
		self.y += self.velocity.y*self.signY;
		self.isСontact();
		self.draw();
	}
	animateThis();
} 


Circle.prototype.isPointInPath = function(x,y){

//if(!y) return;//костыль т.к. видимо в Math.sqrt бывает Nane и он приходит сюда
var imageData = this.context.getImageData(x,y,1,1);	
   
	//все 255 - белый
	
	//вроде работает - но до того как мы не закрасили канвас - его цвет не белый (255.255.255) а (0.0.0)
	//alert(String(imageData.data[0])+"   "+String(imageData.data[1])+"   "+String(imageData.data[2]));
    if(imageData.data[0] != 255 && imageData.data[1] != 255 && imageData.data[2] != 255) return true;
    else return false;
    //imageData.data[0] значение красного цвета (число от 0 до 255);
    //imageData.data[1] //значение зеленого цвета (число от 0 до 255);
    //imageData.data[2] //значение синего цвета (число от 0 до 255);
    //imageData.data[3] //значение прозрачности (число от 0 до 255);

}


Circle.prototype.isСontact = function(){

	var x = this.radius;
	var y = 0;
	var step = 1;
	var indent = 1;
	while(x>-this.radius){
		x = x - step;
		y = Math.round(Math.sqrt(this.radius*this.radius - x*x));

		if(x>0) var indentX = 1*indent;//отступ,при приближении на это растояние произойдет удар
		else var identX = -1*indent;
		if(y>0) var indentY = 1*indent;//отступ,при приближении на это растояние произойдет удар
		else var identY = -1*indent;

		if(x==0) indentX = 0;
		if(y==0) indentY = 0;

		if(this.isPointInPath( x + this.x + indentX, y + this.y + indentY )){ 
			this.ifCollision(x,y);
			this.setRandomColor();
			this.count++;
			//console.log(this.count);
			return;

		}
		//else this.color = "#FF6672";
		if(this.isPointInPath( x + this.x + indentX, -y + this.y + indentY)){
			this.ifCollision(x,y);
			this.setRandomColor();
			this.count++;
			//console.log(this.count);
			return;
		}
		//else this.color = "#FF6672";
	}

}


Circle.prototype.ifCollision = function(x,y){

    //нужно как то определить с каким шаром столкнулся наш шар
	if(x==0){
		this.signX*=1;
		this.signY*=-1;
		return;
	}
	if(y==0){
		this.signX*=-1;
		this.signY*=1;
		return;
	}
	if(x>0 && y>0){		
		this.signX*=-1;
		this.signY*=-1;
	}
	if(x>0 && y<0){
		this.signX*=-1;
		this.signY*=-1;
	}
	if(x<0 && y>0){
		this.signX*=-1;
		this.signY*=-1;
	}
	if(x<0 && y<0){
		this.signX*=-1;
		this.signY*=-1;
	}

}

Circle.prototype.setRandomColor = function(){
	var red =  String(Math.round(Math.random()*255));
	var green =  String(Math.round(Math.random()*255));
	var blue =  String(Math.round(Math.random()*255));
	this.color = "rgb("+red+","+green+","+blue+")";
}

//Circle.prototype.setSmoothlyColor = function(){
//	if(this.red<255) this.red++;
//	this.green++;
//	this.blue++;
//}

function setBackgroundColor(color,context){
	height = document.documentElement.clientHeight;
	width = document.documentElement.clientWidth;
	context.beginPath();
	context.fillStyle = color;
	context.rect(0,0,width,height);
	context.closePath();
	context.fill();
	//Завершающий шаг это вызовом метода stroke или fill.
    //Собственно первый обводит фигуру линиями, а второй заливает фигуру сплошным цветом.
}
 

var canvas = $(".js-canvas")[0];
canvas.height = document.documentElement.clientHeight;//546
canvas.width = document.documentElement.clientWidth;//1082
context = canvas.getContext('2d');
//закрашиваем canvas 
setBackgroundColor("#FFFFFF",context);
var sizeCircle = 10;


var masCircle = [new Circle(100,99,sizeCircle,"#FF6672"),
				 new Circle(430,99,sizeCircle,"#FF6672"),
				 new Circle(553,99,sizeCircle,"#FF6672"),
				 new Circle(323,929,sizeCircle,"#FF6672"),
				 new Circle(979,113,sizeCircle,"#FF6672"),
				 new Circle(600,200,sizeCircle,"#FF6672"),
				 new Circle(900,334,sizeCircle,"#FF6672"),
				 new Circle(700,234,sizeCircle,"#FF6672"),
				 new Circle(1000,500,sizeCircle,"#FF6672"),
				 new Circle(123,99,sizeCircle,"#FF6672")]

for(i=0;i<masCircle.length;i++){//почему не заработал for in ?
	masCircle[i].draw();
	masCircle[i].animate();
}


//мышь в качестве объекта 
canvas.onmousemove = function(evt) {
	var mouseX = evt.pageX - canvas.offsetLeft;
	var mouseY = evt.pageY - canvas.offsetTop;
	var circle = new Circle(mouseX,mouseY,10,"#FF6672");
	circle.draw();
	circle.animate();
	text = "Координаты "+mouseX+":"+mouseY;
	console.log(text);
}