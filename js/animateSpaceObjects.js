class Planet {
    constructor(radius, orbitRadius, color, animationTime) {
        this.diameter = radius;
        this.orbitDiameter = orbitRadius;
        this.color = color;
        this.animationTime = animationTime;
    }
}

const planets = [
    new Planet(15, 13.5, "#2b8bdf", 5),
    new Planet(14, 21, "#574994", 6),
    new Planet(14, 36, "#942552", 7.5),
    new Planet(7, 48.5, "#943f23", 10),
    new Planet(9, 65, "#309474", 15),
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
        $wrappers.push(createPlanet(planet, $spaceObjects, i));
    }
    setTimeout(() => {
        pulse(planets, $wrappers);
        setInterval(() => {
            pulse(planets, $wrappers)
        }, 7000);
    }, 2000);
};

function createPlanetWrapper(planet, i) {
    const $planetWrapper = $('<div class="planet-wrapper">');
    placeInCenter($planetWrapper, planet.orbitDiameter);
    $planetWrapper.css("animation-duration", `${planet.animationTime}s`);
    $planetWrapper.css("animation-name", `orbit${i}`);
    return $planetWrapper;
}

function createPlanetObject(planet) {
    const $planet = $('<div class="planet space-object"></div>');
    $planet.css("background-color", planet.color);
    // calc real size of a planet to avoid recalculations during pulse
    const spaceObjectsWidthStr = $(".space-objects").css("width");
    const spaceObjectsWidthPx = spaceObjectsWidthStr.substring(0, spaceObjectsWidthStr.length - 2);
    const wrapperSizePx = spaceObjectsWidthPx * planet.orbitDiameter / 100;
    const planetDiameterPx = wrapperSizePx * planet.diameter / 100;
    $planet.css("width", planetDiameterPx + "px");
    $planet.css("height", planetDiameterPx + "px");
    $planet.css("left", (100 - planet.diameter) / 2 + "%");
    $planet.css("top", -(planetDiameterPx / 2) + "px");
    return $planet;
}

function createPlanet(planet, $spaceObjects, i) {
    const $planetWrapper = createPlanetWrapper(planet, i);
    const $planetPath = $('<div class="planet-path"></div>');
    const $planet = createPlanetObject(planet);
    $planetWrapper.append($planetPath);
    $planetWrapper.append($planet);
    $spaceObjects.append($planetWrapper);
    return $planetWrapper;
}
