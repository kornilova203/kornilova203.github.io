var sunImg = document.getElementById('sunImg'); //array of planets
var planetsImgs = document.getElementsByClassName('planetImg'); //array of planets
var sunCanvas = document.getElementById('sunCanvas');
var arrOfPlanetsCanvas = document.getElementsByClassName('planetCanvas');

var planets = [];
var sun;
var m = 1; // planet's mass
var M = 1000000; // sun's mass
var G = 3;
var t0,dt;
var vh;
var vw;
var body;

// window.onload = init;
// window.onmousedown = startClick(event);
// window.onmouseup = endClick(event);
// onkeypress="keyPress(event);"

function init() {
  body = document.getElementsByTagName("body")[0];
  vh = body.clientHeight;
  vw = body.clientWidth;
	// create a stationary sun
	sun = new Ball(sunCanvas, sunImg, 200, M);
	sun.pos2D = new Vector2D(vw/2,vh/2);
	sun.draw();
  for (var i = 0; i < planetsImgs.length; i++) {
    planets[i] = new Ball (arrOfPlanetsCanvas[i], planetsImgs[i], 40+30*i, m)
  }
  planets[0].pos2D = new Vector2D(vw/2,vh/2-70);
  planets[1].pos2D = new Vector2D(vw/2,vh/2+122);
	planets[2].pos2D = new Vector2D(vw/2,vh/2-185);
  // var r = planet.pos2D.subtract(sun.pos2D).lenght();
  // var v = 290; //velocity for circular orbit
  var v0 = Math.sqrt(G*M*m/70)+15; //velocity for circular orbit
  var v1 = Math.sqrt(G*M*m/120); //velocity for circular orbit
  var v2 = Math.sqrt(G*M*m/180); //velocity for circular orbit
  planets[0].velo2D = new Vector2D(v0, 0);
  planets[1].velo2D = new Vector2D(-v1, 0);
	planets[2].velo2D = new Vector2D(v2, 0);
  planets[0].draw();
  planets[1].draw();
	planets[2].draw();
  // planets[2].mass = 10;
  // var addSpeed = new Vector2D(100,100);
  planets[2].velo2D = planets[2].velo2D.multiply(0.9);
	t0 = new Date().getTime();
	animFrame();
};

function animFrame(){
	animId = requestAnimationFrame(animFrame);
	onTimer();
}
function onTimer(){
	var t1 = new Date().getTime();
	dt = 0.001*(t1-t0);
	t0 = t1;
	if (dt>0.1) {dt=0;};
	move();
}
function move(){
	movePlanets();
	// calcForce();
	updateVeloOfPlanets();
	// updateVelo(planets[0]);
}

function movePlanets(){
  for (var i = 0; i < planets.length; i++) {
    var planet = planets[i];
	  planet.pos2D = planet.pos2D.addScaled(planet.velo2D,dt);
	  planet.context.clearRect(0, 0, planet.canvas.width, planet.canvas.height);
	  planet.draw();
  }
  if (Math.abs(planet.x - window.innerWidth/2) < 30 &&
      Math.abs(planet.y - window.innerHeight/2) < 30) {
    planet.canvas.style = "display: none";
    planets.splice (i, i);

  }
}

// function calcGravityForce(obj1,obj2) { //calc gravity force between 2 objects
  // r = obj1.pos2D.subtract(obj2.pos2D); //radius vector
  // return r.multiply(-G*obj1.mass*obj2.mass/(r.lengthSquared()*r.length()));
// }

// It is not necessary to calc gravity force
function calcAcc(obj1,obj2) { //calc acceleration for object
  r = obj1.pos2D.subtract(obj2.pos2D); //radius vector
  return r.multiply(-G*obj2.mass/(r.lengthSquared()*r.length()));
}

// acceleration does not depent on planet's mass
// but why changing velo does not affect anything?
function updateVeloOfPlanets(){
  for (var i = 0; i < planets.length; i++) {
    var planet = planets[i];
    // force = calcGravityForce(planet,sun);
    acc = calcAcc(planet,sun);
  	// acc = force.multiply(1/planet.mass);
    // acc = acc.multiply(dt);
    // planet.velo2D.incrementBy(acc.multiply(dt));
    // planet.velo2D = planet.velo2D.addScaled(acc,dt);
    planet.velo2D = planet.velo2D.incrementByScaled(acc,dt);
  }

}
// function updateVelo(obj){
	// obj.velo2D = obj.velo2D.addScaled(acc,dt);
// }

window.onresize = function() {
  sun.changeCanvasSize();
  for (var i = 0; i < planets.length; i++) {
    planets[i].changeCanvasSize();
  }
};

function startClick(e) {
  // alert("hello1");
	startX = 0;
  startY = 0;
	if (!e)var e = window.event;
	if (e.pageX || e.pageY) 	{
		startX = e.pageX;
		startY = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		startX = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		startY = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
}
function endClick(e) {
	endX = 0;
  endY = 0;
	if (!e)var e = window.event;
	if (e.pageX || e.pageY) 	{
		endX = e.pageX;
		endY = e.pageY;
	}
	else if (e.clientX || e.clientY) 	{
		endX = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		endY = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
  if (startX == endX && startY == endY)
    return;
  velo = new Vector2D(endX-startX,endY-startY);
  var newCanvas = document.createElement('canvas');
  newCanvas.style = 'position: absolute; left: 0;';
  var body = document.getElementsByTagName('body')[0];
  body.insertBefore(newCanvas,arrOfPlanetsCanvas[0]);
  var nexti = planets.length;
  planets[nexti] = new Ball (newCanvas, planetsImgs[1], Math.random()*50+50, m)
  planets[nexti].pos2D = new Vector2D(endX,endY);
  planets[nexti].velo2D = velo;
}
