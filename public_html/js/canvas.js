function Circle(x,y,radius,color,masCircle){
	this.masCircle = masCircle;
	this.color = color;
	this.x = x;
	this.y = y;
	this.radius = radius;

	var maxVelocity = 10;
	var signX = 1;
	if(Math.random()>0.5) signX = -1;
	var signY = 1;
	if(Math.random()>0.5) signY = -1;

	this.velocity = {
		x : Math.round(Math.random()*maxVelocity*signX),
		y : Math.round(Math.random()*maxVelocity*signY)
	}

	this.id = "координаты: "+ String(x) + " , " + String(y) +" velocity: " + this.velocity.x+ " ," + this.velocity.y; 

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
	var animateThis = function(time){
		requestAnimationFrame(animateThis);
		self.clear();
		self.isСontact();
		self.x += self.velocity.x;
		self.y += self.velocity.y;
		self.draw();
	}
	animateThis();
} 

Circle.prototype.isСontact = function(){


    if(this.x>canvas.width-this.radius || this.x<=this.radius){
    	this.velocity.x*=-1
    	return;
    }
    if(this.y>canvas.height-this.radius || this.y<=this.radius){
    	this.velocity.y*=-1
    	return;
    }

	var indent1 = Math.round(Math.sqrt(this.velocity.x*this.velocity.x + this.velocity.y*this.velocity.y));
	var stock = 2;

	for(i=0;i<this.masCircle.length;i++){

		var indent2 = Math.round(Math.sqrt(masCircle[i].velocity.x*masCircle[i].velocity.x + masCircle[i].velocity.y*masCircle[i].velocity.y));
		var cathetusX = this.x - masCircle[i].x;
		var cathetusY = this.y - masCircle[i].y;
		var hypotenuse = Math.sqrt(cathetusY*cathetusY + cathetusX*cathetusX);
		var limit = this.radius + masCircle[i].radius + indent1 + indent2;

		if( hypotenuse <= limit && masCircle[i]!=this){
			this.ifCollision(masCircle[i]);
			this.setRandomColor();
		}

	}

}


Circle.prototype.ifCollision = function(circle){

    //console.log(this,circle);
    var mass1 = Math.log(this.radius);
	var mass2 = Math.log(circle.radius);
    this.velocity.x = Math.round( this.calculateVelocity(this.velocity.x,circle.velocity.x,mass1,mass2) ) ; 
	this.velocity.y = Math.round( this.calculateVelocity(this.velocity.y,circle.velocity.y,mass1,mass2) ) ;

}

Circle.prototype.calculateVelocity = function(v1,v2,m1,m2){
	//v1 - скорость нашего шара

	//v1,v2 - проэкции скорости первого и второго шаров
	var E = 0;
	var a = m2*m2 + m1*m2;
	var b = -2*(m2*v2 + m1*v1)*m2;
	var c = (m1*v1+m2*v2)*(m1*v1+m2*v2) - (m1*v1*v1+m2*v2*v2 - 0)*m1;
	var D = b*b - 4*a*c;
	//if(D<0) alert("help");
	//шарики с разной массой исчезают т.к. D<0
	var V1 = -1*(-b + Math.sqrt(D))/(2*a);
	var V2 = -1*(-b - Math.sqrt(D))/(2*a);
	//не учитываем знаки 
	if( (v1<0 && v2<0) || (v2>0 && v1>0) ){
		//если первоначальная скорость нашего шара была меньше второго то скорость возрастет
		if(Math.abs(v1*m1)<Math.abs(v2*m2)) return V1;
		else return V2;
	}
	else{
		if(Math.abs(v1*m1)<Math.abs(v2*m2)) return V2;
		else return V1;
	}

}

Circle.prototype.setRandomColor = function(){
	var red =  String(Math.round(Math.random()*255));
	var green =  String(Math.round(Math.random()*255));
	var blue =  String(Math.round(Math.random()*255));
	this.color = "rgb("+red+","+green+","+blue+")";
}


Circle.prototype.checkAccessory = function(x,y){
    var check = Math.sqrt( (this.x-x)*(this.x-x) + (this.y-y)*(this.y-y) );
    if(check <=  this.radius) return true;
    return false;
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

var masCircle = [];
canvas.onclick = function(evt) {
	var mouseX = evt.pageX - canvas.offsetLeft;
	var mouseY = evt.pageY - canvas.offsetTop;
	var circle = new Circle(mouseX,mouseY,10,"#FF6672",masCircle);
	circle.draw();
	circle.animate();
	masCircle[masCircle.length] = circle;
	text = "Координаты "+mouseX+":"+mouseY;
	console.log(text);
}
