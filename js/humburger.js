var open = 0;
var button = document.getElementsByClassName("humburger-button")[0];
var navList = document.getElementById('nav-list');

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
