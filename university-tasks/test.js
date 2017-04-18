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

const {employee: [{name: name2}]} = {
    employee: [
        {
            name: 'bob',
            age: 20,
        },
        {
            name: 'john',
            age: 20,
        },
    ],
};

const arr = [1, 2, 3, 4];
const arr2 = [
    ...arr.slice(0, 2),
    30,
    ...arr.slice(3),
];

// or

const arr3 = [...arr];
arr3[3] = 20;

// new Map(entries: [key, value][]);  // Map is iterated object. Array of arrays. (in simple object value must be string)
//
// properties:
// readonly size: number;
// clear(): void;
// delete(key): boolean;
// forEach(
//      callbackfn: (value, key, map) => void,
//      thisArg?: any  // context
// }: void;
// get(key): any | underfined;
// has(key): boolean;
// set(key, value): this;  // add new entries
//
// map.set(1, {});
// map.set(null, 'it is null');
// map.set(NaN, 'it is NaN');
// map.set(undefined, 'it is undefined');

// for ( const [key, value] of map ) {
//     console.log(key, value);
// }
//
// new NeakMap(entries?: [key: object, value: any][])
// key is only object

// props:
// delete, get, has, set


new Set(values?: any[]);  // gives unique set of elements

// props:
// size
// add(value)
// delete(value)
// clear
// forEach(fuction(value, value2, set), thisArgs);
// has(value)

const set = new Set( [1, 3, 4, 4, 5] );


class MyError extends Error{
    constructor(message) {
        super(message);
        this.name = MyError.name;
    }
}

try {
    // throw new Error('Error message');
}
catch (exception) {
    console.error( exception );
    if (exception instanceof MyError) {
        // do smth
    }
    else {
        throw exception;
    }
}
finally {
    
}



