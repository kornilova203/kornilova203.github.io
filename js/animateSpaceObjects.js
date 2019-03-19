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

window.onload = () => {
    const $spaceObjects = $(".space-objects");
    $spaceObjects.ready(() => {
        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i];
            createPlanet(planet, $spaceObjects);
        }
    });
};

function createPlanetWrapper(planet) {
    const $planetWrapper = $('<div class="planet-wrapper">');
    $planetWrapper.css("width", planet.orbitDiameter + "%");
    $planetWrapper.css("height", planet.orbitDiameter + "%");
    let offset = (100 - planet.orbitDiameter) / 2;
    $planetWrapper.css("top", offset + "%");
    $planetWrapper.css("left", offset + "%");
    $planetWrapper.css("animation", `orbit ${planet.animationTime}s linear infinite`);
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
}
