window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        alert('hi');
        window.scrollTo(0, 1);
    }, 0);
});

var open = 0;
var navList = document.querySelectorAll('nav ul')[0];
var button = document.getElementsByClassName("humburger-button")[0];
/*var navList = document.getElementById('nav-list');*/

button.onclick = function () {
    if (!open)
      showNavUl();
    else
      hideNavUl();
};
function showNavUl () {
  navList.style.display = 'flex';
  open = 1;
}

function hideNavUl () {
  navList.style.display = 'none';
  open = 0;
}

window.addEventListener("resize", checkSize);
function checkSize() {
  if (window.innerWidth > 540)
    showNavUl();
  else
    hideNavUl();
}
