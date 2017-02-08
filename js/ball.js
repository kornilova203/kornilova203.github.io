// dependencies: Vector2D
function Ball(img, radius, mass){
	this.radius = radius;
	this.sizeCoef;
	this.changeSizeCoef();
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
		var radius = this.radius*this.sizeCoef;
		var x = this.x*this.sizeCoef;
		var y = this.y*this.sizeCoef;
		this.context.drawImage(this.img, window.innerWidth/2 + x - radius/2,
														window.innerHeight/2 + y - radius/2,
														radius,
														radius);
	},
	changeCanvasSize: function () {
		this.context.canvas.width  = window.innerWidth;
	  this.context.canvas.height = window.innerHeight;
	},
	changeSizeCoef: function() {
		var w = window.innerWidth;
		var h = window.innerHeight;
		if (w > h)
			this.sizeCoef = h*0.002;
		else
			this.sizeCoef = w*0.002;

	},
	rotate: function(deg) {
		this.velo2D = this.velo2D.rotate(deg, new Vector2D(0, 0))
		this.pos2D = this.pos2D.rotate(deg,new Vector2D(0, 0))
	},
	clone: function() {
		ball = new Ball(planetImg, this.radius, m);
		ball.pos2D = this.pos2D;
		ball.velo2D = this.velo2D;
		return ball;
	},
	destroyBySun: function(i) {
	  this.canvas.style = "display: none";
	  planets.splice (i, i);
	}
};
