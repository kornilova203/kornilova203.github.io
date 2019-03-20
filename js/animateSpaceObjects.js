class Planet {
    constructor(radius, orbitRadius, animationTime) {
        this.diameter = radius;
        this.orbitDiameter = orbitRadius;
        this.animationTime = animationTime;
    }
}

const COLORS = [
    "#2b8bdf",
    "#5ea0df",
    "#717cdf",
    "#574994",
    "#6c4494",
    "#893794",
    "#942552",
    "#941029",
    "#943f23",
    "#945c28",
    "#5d9443",
    "#44944d",
    "#15947a",
    "#3a9492",
    "#309474"
];

const PLANETS = [
    new Planet(15, 13.5, 5),
    new Planet(14, 21, 6),
    new Planet(14, 36, 7.5),
    new Planet(7, 48.5, 10),
    new Planet(9, 65, 15),
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
    for (let i = 0; i < PLANETS.length; i++) {
        const planet = PLANETS[i];
        $wrappers.push(createPlanet(planet, $spaceObjects, i));
    }
    setTimeout(() => {
        pulse(PLANETS, $wrappers);
        setInterval(() => {
            pulse(PLANETS, $wrappers)
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

function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function createPlanetObject(planet) {
    const $planet = $('<div class="planet space-object"></div>');
    $planet.css("background-color", getRandomColor());
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
