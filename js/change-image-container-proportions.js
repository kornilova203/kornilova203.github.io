var containers = document.getElementsByClassName('img-container');
var images = document.querySelectorAll('.img-container img');
var headers = document.querySelectorAll('h2');
var widthOfContainer = 1000;
var heightOfContainer;

function getNewSize(){
  if (window.innerWidth > 1060)
    widthOfContainer = 1000;
  else
    widthOfContainer = window.innerWidth - 60 - 18;
  heightOfContainer = window.innerHeight / 1.5;
  if (heightOfContainer > 562)
   heightOfContainer = 562;
}


function changeProps (i) {
  //containers[i].style.width = widthOfContainer + 'px';
  containers[i].style.height = heightOfContainer + 'px';
  if (heightOfContainer > widthOfContainer / 16 * 9) {
    images[i].style.height =  heightOfContainer + 'px';
    images[i].style.width =  heightOfContainer / 9 * 16 + 'px';
  }
  else {
    images[i].style.height =  widthOfContainer / 16 * 9 + 'px';
    images[i].style.width =  widthOfContainer + 'px';
  }
}

changeAllProps();
if(!isMobile.any()) //если мы заходим с компа, то делать ресайз
  window.addEventListener("resize", changeAllProps);

function changeAllProps() {
  getNewSize();
  for (var i = 0; i < containers.length; i++) {
    changeProps(i);
  }
}



window.onscroll = function scrl(){
  for (var i = 0; i < headers.length; i++) {
    var toTop = i*window.innerHeight - window.pageYOffset;
    toTop = 1 - toTop / window.innerHeight;

    if (toTop > 0 && toTop < 1)
      headers[i].style.opacity = toTop;
  }
}
