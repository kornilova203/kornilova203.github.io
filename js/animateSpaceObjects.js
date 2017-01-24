var imgs = document.getElementsByClassName('planet'); //array of planets
var planets = [];
var info = document.getElementsByClassName("info")[0];
// info.innerHTML = info.innerHTML + "amount of planets = " + imgs.length + "\n";
var G = 0.5; // probably gravity const
var wWidth;
var wHeight;
var bod; //body
// var clickX;
// var clickY;
var mspf = 30; //frames per second ?
// var currID = 0; //current id ?
function addInfo(str) {
  info.innerHTML = info.innerHTML + str + "\n";
}

function initGravity() {
	bod = document.getElementsByTagName("body")[0];
	wHeight = bod.clientHeight;
	wWidth = bod.clientWidth;
	planets[0] = new Planet (imgs[0], wWidth/2, wHeight/2) // coordinates
	planets[0].mass = 20;
  planets[0].applyCoordinates();
  planets[0].changeSize();

// 	planets[0].div.style.fontSize="500px";
	planets[0].fixed = true; //sun does not move
// 	planets[0].div.style.color = "#DDDD00";
//
	planets[1] = new Planet (imgs[1], wWidth/2, wHeight/2-100);
	planets[1].vX = 0.31623; //vector ?
  // planets[1].applyCoordinates();
  planets[1].changeSize();
  planets[1].applyCoordinates();

  // planets[2] = new Planet (imgs[2], wWidth/2+150, wHeight/2);
  // planets[2].vY = 0.3;
  // planets[2].applyCoordinates();
  //
	// planets[3] = new Planet (imgs[3], wWidth/2, wHeight/2+200);
	// planets[3].vX = -0.25;
  // planets[3].applyCoordinates();
  loop();
  addInfo("sun this.img.clientWidth = " + planets[0].img.clientWidth)
}
document.body.addEventListener("onLoad", initGravity());
//
function Planet(img, x, y) {
	this.x = x;
	this.y = y;
	this.vX = 0;
	this.vY = 0;
	this.mass=0.5;
	// this.id = currID++;
	this.fixed = false;
//	this.lastStep = new Date();
	//var bod = document.getElementsByTagName("body")[0];
	// this.div = document.createElement("div");
	// this.div.innerHTML = "&#183;";
	// this.div.style.position = "fixed";
  this.img = img;
  this.changeSize = function() {
    var size = Math.sqrt(Math.sqrt(this.mass))*100;
    this.img.style.width = size + "px";
    this.img.style.marginTop = -size/2 + "px";
    this.img.style.marginLeft = -size/2 + "px";

  }
  this.applyCoordinates = function () {
    this.img.style.left = this.x + "px"; //apply new coordinates
    this.img.style.top = this.y + "px";
  }
  this.step = stepFunc;
	// this.div.style.fontSize = "100px";
	// this.div.style.visible = "false";
	// this.div.style.color = "#0000FF";

//	this.div.style.left = this.x-this.div.clientWidth/2+"px";
//	this.div.style.top = this.y-this.div.clientHeight/2+"px";
//	bod.appendChild(this.div);
}
function stepFunc() { //for each planet
	if (!this.fixed) { //if it is not sun
		var fgX = 0; //projection of force of gravity on x
		var fgY = 0;
    var fcX = 0;
    var fcY = 0;
		for(var i = 0; i < planets.length; i++) { //for all other planets
			if (planets[i] == this) continue;
			var dX = planets[i].x-this.x; //delta x = differens between two planets
			var dY = planets[i].y-this.y;
			var theta = Math.atan2(dY,dX); //angle between two points
			var rsq = dY*dY+dX*dX //sum of squares of cathetus
			if (rsq < 400) { //if it is closer than 20 px
				//var scale = Math.sqrt(rsq)/20;
				this.x = planets[i].x-Math.cos(theta)*20;
				this.y = planets[i].y-Math.sin(theta)*20;
				rsq = 400; //make distance between them 20 px
			}
			var fg = G*this.mass*planets[i].mass/(rsq); //force of gravity
			fgX += fg*Math.cos(theta); //projection of gravity on x
			fgY += fg*Math.sin(theta); //projection of gravity on y
      // here you should count force of centre
      // then count it's projection
      // var v = Math.sqrt(this.vX*this.vX + this.vY*this.vY); //count speed
      // var fc = this.mass*v*v/Math.sqrt(rsq);
      // fcX += fc*Math.cos(theta); //projection of gravity on x
			// fcY += fc*Math.sin(theta); //projection of gravity on y
		}
	  //   var currDate = new Date();
		// var dTime = currDate.getTime()-this.lastStep.getTime();
		this.vX += (fgX/this.mass)*(mspf); //projection of vector
		this.vY += (fgY/this.mass)*(mspf); //changing of coordinate per ms * amount of sec
    // this.vX -= (fcX/this.mass)*(mspf); //projection of vector
		// this.vY -= (fcY/this.mass)*(mspf); //changing of coordinate per ms * amount of sec
		this.x += this.vX*mspf; //add vector to coordinate
		this.y += this.vY*mspf;
    //     // if bump into border:
		if (this.x < 25) {
			this.x = 25;
			this.vX = 0;
		}
		if (this.y < 25) {
			this.y = 25;
			this.vY = 0;
		}

		if (this.x > wWidth-25) {
			this.x = wWidth-25;
			this.vX = 0;
		}
		if (this.y > wHeight-25) {
			this.y = wHeight-25;
			this.vY = 0;
		}
    // this.applyCoordinates();
    this.img.style.left = (this.x-this.img.clientWidth/2)+"px"; //apply new coordinates
  	this.img.style.top = (this.y-this.img.clientHeight/2)+"px";
	}

	// this.div.style.visible = "true";
//
// //	this.lastStep = currDate;
}
// Ball.prototype.step = step;
// Ball.prototype.x;
// Ball.prototype.y;
// Ball.prototype.vX;
// Ball.prototype.vY;
// Ball.prototype.mass;
// //Ball.prototype.lastStep;
// Ball.prototype.div;
// Ball.prototype.fixed;
function loop() {
	for(var i = 0; i < planets.length; i++) {
		planets[i].step();
	}
	setTimeout("loop()",mspf);
}
//
// function startClick(e) {
// 	clickX = 0;
// 	clickY = 0;
// 	if (!e)var e = window.event;
// 	if (e.pageX || e.pageY) 	{
// 		clickX = e.pageX;
// 		clickY = e.pageY;
// 	}
// 	else if (e.clientX || e.clientY) 	{
// 		clickX = e.clientX + document.body.scrollLeft
// 			+ document.documentElement.scrollLeft;
// 		clickY = e.clientY + document.body.scrollTop
// 			+ document.documentElement.scrollTop;
// 	}
// }
// function endClick(e) {
// 	var posx = 0;
// 	var posy = 0;
// 	if (!e) var e = window.event;
// 	if (e.pageX || e.pageY) 	{
// 		posx = e.pageX;
// 		posy = e.pageY;
// 	}
// 	else if (e.clientX || e.clientY) 	{
// 		posx = e.clientX + document.body.scrollLeft
// 			+ document.documentElement.scrollLeft;
// 		posy = e.clientY + document.body.scrollTop
// 			+ document.documentElement.scrollTop;
// 	}
// 	var end = planets.length;
// 	planets[end] = new Ball(clickX,clickY);
// 	planets[end].vX = (posx-clickX)*0.01;
// 	planets[end].vY = (posy-clickY)*0.01;
// }
// function keyPress(e) {
// 	if (!e) var e = window.event;
// 	if (String.fromCharCode(e.charCode).toLowerCase() == 'c') {
// 		var temp = planets[0];
// 		for (var i = 1; i < planets.length; i++) {
// 			bod.removeChild(planets[i].div);
// 		}
// 		planets.length = 0;
// 		planets[0] = temp;
// 	}
// }
