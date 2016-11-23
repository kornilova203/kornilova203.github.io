// Рисует функция draw
// Продолжительность анимации duration
/*function animate(draw, duration) {
  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    // определить, сколько прошло времени с начала анимации
    var timePassed = time - start;

    // возможно небольшое превышение времени, в этом случае зафиксировать конец
    if (timePassed > duration) timePassed = duration;

    // нарисовать состояние анимации в момент timePassed
    draw(timePassed);

    // если время анимации не закончилось - запланировать ещё кадр
    if (timePassed < duration) {
      requestAnimationFrame(animate);
    }

  });
}

animate(function(timePassed) {
  sunOn.style.opacity = timePassed / 500;
  if (timePassed > 300)
    sunOn.style.opacity = 0;
  if (timePassed > 500)
    sunOn.style.opacity = (timePassed - 500) / 100;
  if (timePassed > 600)
      sunOn.style.opacity = 0;
  if (timePassed > 700)
      sunOn.style.opacity = (timePassed - 700) / 100;
  if (timePassed > 800)
      sunOn.style.opacity = 1 - (timePassed - 800) / 2000;
  if (timePassed > 1000)
      sunOn.style.opacity = (timePassed - 1000) / 2000;
}, 2000);*/

sunOn.onmousedown = function()
{
    document.getElementById("sunOn").style.animationName = "";
}
sunOn.onclick = function()
{
    document.getElementById("sunOn").style.animationName = "blink";
}
/*
function turnOn () {
  alert('he');
  sunOn.style.animation = " ";
  sunOn.style.animation = "turnOn 1s linear 1";

}

sunOn.onclick = turnOn;*/
