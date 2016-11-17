var planets = [planet1,planet2,planet3,planet4,planet5];
var sunSize=0.13;
var paths = [path1,path2,path3,path4,path5];
var relativePlanetSize = [0.2,0.3,0.45,0.7,1];
var startAngleOfPlanet = [1,3,6,2,5];
var planetSpeed = [2,1.4,0.6,0.7,0.5];
var biggestRadius950 = 180; //размер бОльшего радиуса при размере окна 950
var biggestRadius=biggestRadius950;
var planetSizeCoef=0.3; //во сколько раз диаметр планеты отличается от радиуса орбиты
var height = window.innerHeight;
var width = window.innerWidth;
var minFontSize = 18; /*минимальный размер шрифта*/
var i;
var numberOfPlanets = 5;
var colors = ['rgb(246, 91, 23)','rgb(85, 255, 154)','rgb(224, 64, 251)','rgb(100, 204, 9)','rgb(51, 99, 255)','rgb(229, 248, 46)','rgb(173, 219, 207)','rgb(172, 0, 44)','rgb(255, 188, 0)'];
var numberOfColor=9;



/*  СТАРТОВЫЕ РАЗМЕРЫ. ПРИМЕНЯЮТСЯ СРАЗУ ЖЕ*/
//определяем бОльший размер (чтобы иллюстрация всегда занимала 100% окна):
if (height>width) {
  var biggerSize=height;
  var smallerSize=width;
}
else {
  biggerSize=width;
  smallerSize=height;
}

biggestRadius=biggestRadius950*smallerSize/950;
document.body.style.fontSize=getFontSize(biggerSize) + 'px';
//Устанавливаем изначальный размер и положение
setSunSize();
for (i=0;i<numberOfPlanets;i++) {
  setOrbitAndPlanetSize(i);
  setFirstPosition(i);
}

//Запускаем анимацию вращения
for (i=0;i<numberOfPlanets;i++) {
  animation(i);
}

/*Изменение рамзмеров орбит и планет
  Вополняется в самом начале и при измерении размеров окна*/
function setOrbitAndPlanetSize (num) {
  var path=paths[num];
  var planet=planets[num];
  orbitRadius = biggestRadius*relativePlanetSize[num];
  path.style.width = path.style.height = orbitRadius*2 + 'px';
  path.style.marginTop = path.style.marginLeft = -(orbitRadius+2) + 'px';
  path.style.borderRadius = (orbitRadius+2) + 'px';
  planet.style.width = planet.style.height = orbitRadius*planetSizeCoef + 'px';
  planet.style.borderRadius = orbitRadius*planetSizeCoef/2 + 'px';
}

/*При пульсации нам не нужно менять размеры планет -
  их изменение почти незаметно*/
function setOrbitSize (num) {
  var path=paths[num];
  orbitRadius = biggestRadius*relativePlanetSize[num];
  path.style.width = path.style.height = orbitRadius*2 + 'px';
  path.style.marginTop = path.style.marginLeft = -(orbitRadius+2) + 'px';
  path.style.borderRadius = (orbitRadius+2) + 'px';
}

function setFirstPosition (num) {
  var planet=planets[num];
  orbitRadius = biggestRadius*relativePlanetSize[num];
  planet.style.background = colors[num];
  planet.style.left = orbitRadius*(1-planetSizeCoef/2) + orbitRadius * Math.sin(startAngleOfPlanet[num])  + 'px'; // меняем координаты элемента, подобно тому как мы это делали в школе в декартовой системе координат. Правда, в данном случае используется полярная система координат, изменяя угол
  planet.style.top = orbitRadius*(1-planetSizeCoef/2) - orbitRadius * Math.cos(startAngleOfPlanet[num]) + 'px';
}

function setSunSize(){
  var radius=biggestRadius*sunSize;
  sunCircle.style.width = sunCircle.style.height = radius*2 + 'px';
  sunCircle.style.marginTop = sunCircle.style.marginLeft = -radius + 'px';
  sunCircle.style.borderRadius = (radius+2) + 'px';
}

function animation(num) {
  var planet=planets[num];
  //var orbitRadius = biggestRadius*relativePlanetSize[num];
  var angle = 0;
  var deltaAngle = planetSpeed[num] * Math.PI / 180; //Вычислим угол на который поворачивается за единицу интервала
  setInterval(function() { // функция движения
    angle += deltaAngle; // приращение аргумента
    planet.style.left = biggestRadius*relativePlanetSize[num]*(1-planetSizeCoef/2) + biggestRadius*relativePlanetSize[num] * Math.sin(angle+startAngleOfPlanet[num])  + 'px'; // меняем координаты элемента, подобно тому как мы это делали в школе в декартовой системе координат. Правда, в данном случае используется полярная система координат, изменяя угол
    planet.style.top = biggestRadius*relativePlanetSize[num]*(1-planetSizeCoef/2) - biggestRadius*relativePlanetSize[num] * Math.cos(angle+startAngleOfPlanet[num]) + 'px';
  }, 20)
}

//назначаем обработчики кликов
sunCircle.addEventListener( "click" , changeColor);
for (i=0;i<numberOfPlanets;i++) {
  planets[i].onclick = changeColor;
}

function changeColor() {
  var ran =randomInteger(0, numberOfColor)
  var stl = getComputedStyle(this);
  if (stl.backgroundColor==colors[ran]) { //если цвет изменится на тот же самый
    if (ran == numberOfColor) /*если цвета совпали*/
      ran = 0;
    else
      ran+=1;
    }
  this.style.background = colors[ran];
};

function randomInteger(min, max) {
  var rand = min + Math.random() * (max - min)
  rand = Math.round(rand);
  return rand;
}

window.onresize = function resize() {
  height = window.innerHeight;
  width = window.innerWidth;
  //определяем бОльший размер (чтобы иллюстрация всегда занимала 100% окна):
  if (height>width) {
    var biggerSize=height;
    var smallerSize=width;
  }
  else {
    biggerSize=width;
    smallerSize=height;
  }
  biggestRadius=biggestRadius950*smallerSize/950;
  /*Определяем размер шрифта*/
  document.body.style.fontSize=getFontSize(biggerSize) + 'px';
  setSunSize();
  for (i=0;i<numberOfPlanets;i++) {
    setOrbitAndPlanetSize(i);
  }
}

/*Вычисляет размер шрифта
  Входные параметры: максимальный размер окна (высота или ширина)*/
function getFontSize(bs){
  if (bs*0.015<minFontSize){
    return minFontSize;
  }
  else {
    return bs*0.015;
  }
}

var t = setInterval(function() {
  pulseAll()
}, 4000);

sunCircle.addEventListener( "click" , pulseAll);

/*Пульсация планет при нажатии на солнце*/
function pulseAll(){
  var sec=50; //промежуток между ф-циями
  changeColor.call(planets[0]);
  pulse(0)
  var timer1 = setInterval(function() {
    changeColor.call(planets[1]);
    pulse(1);
    clearInterval(timer1);
    return;
  }, sec);
  var timer2 = setInterval(function() {
    changeColor.call(planets[2]);
    pulse(2);
    clearInterval(timer2);
    return;
  }, sec*2.2);
  var timer3 = setInterval(function() {
    changeColor.call(planets[3]);
    pulse(3);
    clearInterval(timer3);
    return;
  }, sec*3.6);
  var timer4 = setInterval(function() {
    changeColor.call(planets[4]);
    pulse(4);
    clearInterval(timer4);
    return;
  }, sec*5);
}
function pulse(num){
  var amountOfChange = 10;/*количество увеличений диаметра планет при нажатии на солнце*/
  var deltaDiametr=0.003; /*расстояние, на которое увеличивается диаметр при анимации*/
  var amountOfChange = 10;
  var increaseNumber=amountOfChange;
  var decreaseNumber=amountOfChange;
  var deltaDiametr=0.003;
  var timer = setInterval(function() {
  if (increaseNumber>0) { /*увеличиваем*/
    relativePlanetSize[num]+=deltaDiametr;
    increaseNumber-=1;
  }
  else
    if (decreaseNumber>0){ /*уменьшаем*/
      relativePlanetSize[num]-=deltaDiametr;
      decreaseNumber-=1;
    }
    else {
      clearInterval(timer); // конец через 2 секунды
      return;
    }
  setOrbitSize(num);
}, amountOfChange*2);

}
