var height = window.innerHeight;
var width = window.innerWidth;
var minFontSize = 18; /*минимальный размер шрифта*/
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


document.body.style.fontSize=getFontSize(biggerSize) + 'px';

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
  document.body.style.fontSize=getFontSize(biggerSize) + 'px';
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

///////////////////////////////////////////////////////////////////////
var scroll=0;
pic1.style.opacity = 1;
pic2.style.opacity = 0;
head1.style.opacity = 1;
head2.style.opacity = 0;
  var activeWindow = [1,0,0];
window.onscroll = function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled<300&&activeWindow[0]==0){
    activeWindow[0]=1;
    activeWindow[1]=0;
    changeColor.call(circle);
    pic2.style.opacity = 0;
    head2.style.opacity = 0;
    setTimeout(function() { pic1.style.opacity = 0.9; }, 500);
    setTimeout(function() { head1.style.opacity = 0.9; }, 500);

  }
  if (scrolled>299&&activeWindow[1]==0){
    activeWindow[1]=1;
    activeWindow[0]=0;
    changeColor.call(circle);
    pic1.style.opacity = 0;
    head1.style.opacity = 0;
    setTimeout(function() { pic2.style.opacity = 0.9; }, 500);
    setTimeout(function() { head2.style.opacity = 0.9; }, 500);
  }
  document.getElementById('showScroll').innerHTML = scrolled + 'px';
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
