var sunImg = document.getElementById('sunImg'); //array of planets
var planetsImgs = document.getElementsByClassName('planetImg'); //array of planets

var planets = [];
var secondGroupOfPlanets = [];
var amountOfPlanets = 3;
var sun;
var m = 1; // planet's mass
var M = 1000000; // sun's mass
var G = 1;
var t0,dt;
var body = document.getElementsByTagName("body")[0];
var vh = window.innerHeight;
var vw = window.innerWidth;

var info = document.getElementById("info");
//
function addInfo(string) {
  info.innerHTML = info.innerHTML + string + "<br>";
}

// addInfo("hello")
var distanceToSun = 150;

// addInfo("distance to sun: " + distanceToSun)
// addInfo("vh/2: " + vh/2 + " vw/2 " + vw/2);

// Create array of planets
function createPlanets(amount, distance) {
  angle = 360/amount;
  var newArr = [];
  newArr.push(new Ball (planetsImgs[0], 30, m))
  newArr[0].pos2D = new Vector2D(0,-distance);
  var v = Math.sqrt(G*M*m/distance)*0.75; //velocity for circular orbit
  newArr[0].velo2D = new Vector2D(v, 0);
  for (var i = 1; i < amount; i++) {
    newArr.push(newArr[i-1].clone());
    newArr[i].rotate(angle);
  }
  return newArr;
}

// window.onload = init;
// window.onmousedown = startClick(event);
// window.onmouseup = endClick(event);
// onkeypress="keyPress(event);"

function init() {
	// create a stationary sun
	sun = new Ball(sunImg, 100, M);
	sun.pos2D = new Vector2D(0, 0);
	sun.draw();
  planets = createPlanets(amountOfPlanets, distanceToSun);
  for (var i = 0; i<planets.length; i++)
    planets[i].rotate(10);
  planets.push.apply(planets, createPlanets(amountOfPlanets, distanceToSun-50)); // start new group of planets
  for (var i = 0; i < planets.length; i++) {
    planets[i].draw();
  }
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
	if (dt>0.2) {
    dt = 0;
    // addInfo("yo!")
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
	  planet.pos2D = planet.pos2D.addScaled(planet.velo2D,dt);
	  planet.context.clearRect(0, 0, planet.canvas.width, planet.canvas.height);
	  planet.draw();
  }
  // if (planets[0].velo2D.length() < prevVeloLength && prevVeloLength > 150 && arrUnite == 0) { // if velo reached maximum
  //   addInfo("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  //   arrUnite = 1;
  //   arrLength *= 2;
  //   // planets.push.apply(planets, secondGroupOfPlanets); // start new group of planets
  // }
  // else {
  //   prevVeloLength = planets[0].velo2D.length();
  //   // addInfo("velo = " + prevVeloLength);
  // }
  if (Math.abs(planet.x - window.innerWidth/2) < 20 &&
      Math.abs(planet.y - window.innerHeight/2) < 20) {
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
  // addInfo("resize!");
  sun.context.clearRect(0, 0, sun.canvas.width, sun.canvas.height);
  sun.changeCanvasSize();
  sun.draw();
  sun.changeSizeCoef();

  // count difference between width of canvas and width of viewport
  // devide it by 2. And addign it to margin
  for (var i = 0; i < planets.length; i++) {
    planets[i].changeCanvasSize();
    planets[i].changeSizeCoef();
  }
}

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
  var nexti = planets.length;
  planets[nexti] = new Ball (planetsImgs[0], Math.random()*50+50, m)
  planets[nexti].pos2D = new Vector2D(endX,endY);
  planets[nexti].velo2D = velo;
}
