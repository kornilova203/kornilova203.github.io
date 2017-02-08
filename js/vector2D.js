function Vector2D(x,y) {
	this.x = x;
	this.y = y;
}

Vector2D.prototype = {
	lengthSquared: function(){
		return this.x*this.x + this.y*this.y;
	},
	length: function(){
		return Math.sqrt(this.lengthSquared());
	},
	incrementByScaled: function(vec,k) {
		this.x += vec.x*k;
		this.y += vec.y*k;
		return new Vector2D(this.x,this.y);
	},
	subtract: function(vec) {
		return new Vector2D(this.x - vec.x,this.y - vec.y);
	},
	multiply: function(k) {
		return new Vector2D(k*this.x,k*this.y);
	},
	addScaled: function(vec,k) {
		return new Vector2D(this.x + k*vec.x, this.y + k*vec.y);
	},
	rotate: function(deg, center) {
		rad = deg * (Math.PI / 180);
		var x = center.x + (this.x - center.x) * Math.cos(rad) - (this.y - center.y) * Math.sin(rad);
		var y = center.y + (this.y - center.y) * Math.cos(rad) + (this.x - center.x) * Math.sin(rad);
		return new Vector2D(x, y);
	}
};
