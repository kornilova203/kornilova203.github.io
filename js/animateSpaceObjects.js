var imgs = document.getElementsByClassName('planet'); //array of planets
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var canvas_bg = document.getElementById('canvas_bg');
var context_bg = canvas_bg.getContext('2d');

var planet;
var sun;
var m = 1; // planet's mass
var M = 1000000; // sun's mass
var G = 10;
var t0,dt;
var vh;
var vw;
var body;

window.onload = init;

function init() {
  context.canvas.width  = window.innerWidth;
  context.canvas.height = window.innerHeight;
  context_bg.canvas.width  = window.innerWidth;
  context_bg.canvas.height = window.innerHeight;
  body = document.getElementsByTagName("body")[0];
  vh = body.clientHeight;
  vw = body.clientWidth;
	// create 100 stars randomly positioned
	// for (var i=0; i<100; i++){
	// 	var star = new Ball(Math.random()*2,'#ffff00');
	// 	star.pos2D = new Vector2D(Math.random()*canvas_bg.width,Math.random()*canvas_bg.height);
	// 	star.draw(context_bg);
	// }
	// create a stationary sun
	sun = new Ball(imgs[0], 200, M);
	sun.pos2D = new Vector2D(vw/2,vh/2);
	sun.draw(context_bg);
	// create a moving planet
	planet = new Ball(imgs[1], 70, m);
	planet.pos2D = new Vector2D(vw/2,vh/2-150);
  // var r = planet.pos2D.subtract(sun.pos2D).lenght();
  var v = Math.sqrt(G*M*m/150); //velocity for circular orbit
	planet.velo2D = new Vector2D(v, 0);
	//planet.velo2D = new Vector2D(70,-40);
	//planet.velo2D = new Vector2D(85,-40);
	//planet.velo2D = new Vector2D(80,0);
	//planet.velo2D = new Vector2D(100,0);
	//planet.velo2D = new Vector2D(105,0);
	planet.draw(context);
	// make the planet orbit the sun
	t0 = new Date().getTime();
	animFrame();
};

function animFrame(){
	animId = requestAnimationFrame(animFrame,canvas);
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
	moveObject(planet);
	calcForce();
	updateAccel();
	updateVelo(planet);
}

function moveObject(obj){
	obj.pos2D = obj.pos2D.addScaled(obj.velo2D,dt);
	context.clearRect(0, 0, canvas.width, canvas.height);
	obj.draw(context);
}
function calcForce(){
	force = Forces.gravity(G,M,m,planet.pos2D.subtract(sun.pos2D));
}
function updateAccel(){
	acc = force.multiply(1/m);
}
function updateVelo(obj){
	obj.velo2D = obj.velo2D.addScaled(acc,dt);
}
