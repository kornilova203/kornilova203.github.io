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
	draw: function (context) {
		context.drawImage(this.img, this.x-this.radius/2, this.y-this.radius/2, this.radius,this.radius);
	}
};
