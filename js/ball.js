// dependencies: Vector2D
function Ball(img, radius, mass){
	if(typeof(radius)==='undefined') radius = 20;
	if(typeof(mass)==='undefined') mass = 1;
	this.radius = radius;
	this.mass = mass;
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.img = img;
	this.canvas = document.createElement('canvas');
	this.canvas.style = "position: absolute; left: 0; top: 0; pointer-events: none; display:block;"
  document.getElementsByTagName('body')[0].appendChild(this.canvas);
	this.context = this.canvas.getContext('2d');
	this.context.canvas.width  = window.innerWidth;
  this.context.canvas.height = window.innerHeight;
	// this.img.style.width = 10 + 'px';
	// image = new Image();

	// image.onload = function() {
		// context.drawImage(image, 69, 50);
	// };
	// image.src = 'img/space/sun-on.png';
}

Ball.prototype = {
	get pos2D (){
		return new Vector2D(this.x,this.y);
	},
	set pos2D (pos){
		this.x = pos.x;
		this.y = pos.y;
	},
	get velo2D (){
		return new Vector2D(this.vx,this.vy);
	},
	set velo2D (velo){
		this.vx = velo.x;
		this.vy = velo.y;
	},
	draw: function () {
		this.context.drawImage(this.img, this.x-this.radius/2, this.y-this.radius/2, this.radius,this.radius);
	},
	changeCanvasSize: function () {
		this.context.canvas.width  = window.innerWidth;
	  this.context.canvas.height = window.innerHeight;
	},
	// changeCanvasMargin: function() {
	// 	var difw = window.innerWidth - this.context.canvas.width
	// },
	rotate: function(deg) {
		this.velo2D = this.velo2D.rotate(deg, new Vector2D(0, 0))
		// addInfo("window.innerHeight / 2: " + window.innerHeight / 2 + " window.innerWidth / 2 " + window.innerWidth / 2);
		this.pos2D = this.pos2D.rotate(deg,new Vector2D(window.innerWidth / 2,window.innerHeight / 2))
	},
	clone: function() {
		ball = new Ball(planetsImgs[0], this.radius, m);
		ball.pos2D = this.pos2D;
		ball.velo2D = this.velo2D;
		return ball;
	}
};
