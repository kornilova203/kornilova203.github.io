var sunImg = document.getElementById('sunImg');
var planetImg = document.getElementById('planetImg');

var planets = [];
var amountOfPlanets = 3;
var sun;
var m = 1; // planet's mass
var M = 1000000; // sun's mass
var G = 1;
var distanceToSun = 150;
var t0, dt;
var body = document.getElementsByTagName("body")[0];
var vh = window.innerHeight;
var vw = window.innerWidth;

// var info = document.getElementById("info");

// function addInfo(string) {
  // info.innerHTML = info.innerHTML + string + "<br>";
// }

// Create circle array of planets
function createPlanets(amount, distance) {
  angle = 360/amount;
  var newArr = [];
  newArr.push(new Ball (planetImg, 30, m)); // create first planet
  newArr[0].pos2D = new Vector2D(0,-distance); // assign start position
  var v = Math.sqrt(G*M*m/distance)*0.75; // count velocity for elliptical orbit
  newArr[0].velo2D = new Vector2D(v, 0);
  for (var i = 1; i < amount; i++) {
    newArr.push(newArr[i-1].clone()); // clone previous planet
    newArr[i].rotate(angle); // rotate it
  }
  return newArr;
}

// create a stationary sun
function createSun() {
  sun = new Ball(sunImg, 100, M);
	sun.pos2D = new Vector2D(0, 0);
	sun.draw();
}

function init() {
  createSun(); // create a stationary sun
	planets = createPlanets(amountOfPlanets, distanceToSun); //create arr of 3 planets
  for (var i = 0; i<planets.length; i++)
    planets[i].rotate(10); //move it slightly
  // create inner group of planets:
  planets.push.apply(planets, createPlanets(amountOfPlanets, distanceToSun-50));
  for (var i = 0; i < planets.length; i++)
    planets[i].draw(); // draw all planets
	t0 = new Date().getTime(); // remember start time
	animFrame(); // start animation
};

function animFrame() {
	animId = requestAnimationFrame(animFrame);
	onTimer();
}

function onTimer(){
	var t1 = new Date().getTime();
	dt = 0.001*(t1-t0); // count delta t
	t0 = t1;
	if (dt > 0.2) { // if delay was more than 200ms
    dt /= 2; // lessen it (to lessen error)
    if (dt < 0.2) // if delay is still big
      dt = 0; //discard this period
  }
	move();
}

function move(){
	movePlanets();
	updateVeloOfPlanets();
}

function movePlanets() {
  for (var i = 0; i < planets.length; i++) {
    var planet = planets[i];
    if (Math.abs(planet.x) < 20 &&
        Math.abs(planet.y) < 20) { // if too close to sun
      planet.destroyBySun(i);
    }
	  planet.pos2D = planet.pos2D.addScaled(planet.velo2D, dt); // change position
	  planet.context.clearRect(0, 0, planet.canvas.width, planet.canvas.height);
	  planet.draw();
  }
}

// Calculate acceleration
function calcAcc(obj1, obj2) {
  r = obj1.pos2D.subtract(obj2.pos2D); // get radius vector
  return r.multiply(-G*obj2.mass/(r.lengthSquared()*r.length()));
}

function updateVeloOfPlanets(){
  for (var i = 0; i < planets.length; i++) {
    var planet = planets[i];
    acc = calcAcc(planet,sun);
    planet.velo2D = planet.velo2D.incrementByScaled(acc,dt);
  }
}

window.onresize = function() {
  // change position of sun
  sun.context.clearRect(0, 0, sun.canvas.width, sun.canvas.height);
  sun.changeCanvasSize();
  sun.draw();
  sun.changeSizeCoef();

  // change position of planets
  for (var i = 0; i < planets.length; i++) {
    planets[i].changeCanvasSize();
    planets[i].changeSizeCoef();
  }
}
