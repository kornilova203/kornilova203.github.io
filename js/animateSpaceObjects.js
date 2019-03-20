class Planet {
    constructor(radius, orbitRadius, color, animationTime) {
        this.diameter = radius;
        this.orbitDiameter = orbitRadius;
        this.color = color;
        this.animationTime = animationTime;
    }
}

const planets = [
    new Planet(18, 13.5, "#2b8bdf", 5),
    new Planet(14, 21.0, "#574994", 6),
    new Planet(18, 36, "#942552", 7.5),
    new Planet(8, 48.5, "#943f23", 10),
    new Planet(13, 65, "#309474", 15),
];

const ANIMATION_TIME = 1000;
const DELAY_STEP = 100;
const PULSE_COEFFICIENT = 1.2;

function placeInCenter($el, size) {
    $el.css("width", size + "%");
    $el.css("height", size + "%");
    let offset = (100 - size) / 2;
    $el.css("top", offset + "%");
    $el.css("left", offset + "%");
}

function pulse(planets, $wrappers) {
    let currentDelay = 0;
    for (let i = 0; i < planets.length; i++) {
        setTimeout(() => {
            const planet = planets[i];
            const $wrapper = $wrappers[i];
            placeInCenter($wrapper, planet.orbitDiameter * PULSE_COEFFICIENT);
            setTimeout(() => {
                placeInCenter($wrapper, planet.orbitDiameter);
            }, ANIMATION_TIME)
        }, currentDelay);
        currentDelay += DELAY_STEP;
    }
}

window.onload = () => {
    const $spaceObjects = $(".space-objects");
    const $wrappers = [];
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        $wrappers.push(createPlanet(planet, $spaceObjects));
    }
    setTimeout(() => {
        pulse(planets, $wrappers);
        setInterval(() => {
            pulse(planets, $wrappers)
        }, 7000);
    }, 2000);
};

function createPlanetWrapper(planet) {
    const $planetWrapper = $('<div class="planet-wrapper">');
    placeInCenter($planetWrapper, planet.orbitDiameter);
    $planetWrapper.css("animation-duration", `${planet.animationTime}s`);
    return $planetWrapper;
}

function createPlanetObject(planet) {
    const $planet = $('<div class="planet space-object"></div>');
    $planet.css("background-color", planet.color);
    $planet.css("width", planet.diameter + "%");
    $planet.css("height", planet.diameter + "%");
    $planet.css("left", (100 - planet.diameter) / 2 + "%");
    $planet.css("top", -(planet.diameter / 2) + "%");
    $planet.css("transform-origin", `50% ${((50 / planet.diameter) * 100) + 50}%`);
    $planet.css("transform", `rotate(${Math.random()*360}deg)`);
    return $planet;
}

function createPlanet(planet, $spaceObjects) {
    const $planetWrapper = createPlanetWrapper(planet);
    const $planetPath = $('<div class="planet-path"></div>');
    const $planet = createPlanetObject(planet);
    $planetWrapper.append($planetPath);
    $planetWrapper.append($planet);
    $spaceObjects.append($planetWrapper);
    return $planetWrapper;
}
