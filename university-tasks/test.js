Object.defineProperties(
    bob,
    {
        gender: {
            enumerable: true,
            value: 'male'
        }
    }
);

const bob2 = Object.create(
    Object.prototype,
    {
        firstName: {
            enumerable: true,
            writable: true,
            value: 'Bob',
        },
    }
);

const bob3 = {
    firstName: 'Bob',
    lastName: 'Smith',
    // ES5
    get fullName() {
        return this.firstName + this.lastName;
    },
    set fullName(value) {
        const parts = value.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    },
    // ES6 functions
    say(message) {
        console.log(this.fullName + ': ' + message);
    }
};

// old style
function Mammalia() {}
Mammalia.prototype['class'] = 'Mammalia';

function Human(name) {
    this.name = name;
}

// inheritance:
Human.prototype = new Mammalia();
Human.prototype.constructor = Human;
// ...

// ES6

class Mammalia {
    constructor() {
        this.class = 'Mammalia';
        this.species = 'Unknown';
    }
}

class Human extends Mammalia {
    constructor(name = 'Some human') {  // all properties must be in constructor
        super();  // call parent constructor (must be done before using "this")
        this.name = name;
        this['class'] = "Mammalia";
    }
    say(message) {
        console.log(this.name + ': ' + message);
    }
    static staticMethod() {
        console.log("I am a human");
    }
    getClass() {
        return super.getClass() + ' hello';  // call parent method
    }
}

Human.staticMethod();
Human.statucProp = "static prop";

const Human2 = class {

};

class MyError extends Error {

}
